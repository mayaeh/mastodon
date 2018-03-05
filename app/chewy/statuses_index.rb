# frozen_string_literal: true

class StatusesIndex < Chewy::Index
  settings index: { refresh_interval: '15m' }, analysis: {
    filter: {
      pos_filter: {
        type: 'kuromoji_part_of_speech',
        stoptags: %w(
          '助詞-格助詞-一般'
          '助詞-終助詞'
        ),
      },
      greek_lowercase_filter: {
        type: 'lowercase',
        language: 'greek',
      },
      english_stop: {
        type: 'stop',
        stopwords: '_english_',
      },
      english_stemmer: {
        type: 'stemmer',
        language: 'english',
      },
      english_possessive_stemmer: {
        type: 'stemmer',
        language: 'possessive_english',
      },
    },
    tokenizer: {
      ja_tokenizer: {
        type: 'kuromoji_tokenizer',
        mode: 'search',
      },
    },
    analyzer: {
      content: {
        tokenizer: 'ja_tokenizer',
        type: "custom",
        filter: %w(
          kuromoji_baseform
          kuromoji_stemmer
          pos_filter
          ja_stop
          english_possessive_stemmer
          greek_lowercase_filter
          asciifolding
          cjk_width
          english_stop
          english_stemmer
        ),
      },
    },
  }

  define_type ::Status.without_reblogs do
    crutch :mentions do |collection|
      data = ::Mention.where(status_id: collection.map(&:id)).pluck(:status_id, :account_id)
      data.each.with_object({}) { |(id, name), result| (result[id] ||= []).push(name) }
    end

    crutch :favourites do |collection|
      data = ::Favourite.where(status_id: collection.map(&:id)).pluck(:status_id, :account_id)
      data.each.with_object({}) { |(id, name), result| (result[id] ||= []).push(name) }
    end

    crutch :reblogs do |collection|
      data = ::Status.where(reblog_of_id: collection.map(&:id)).pluck(:reblog_of_id, :account_id)
      data.each.with_object({}) { |(id, name), result| (result[id] ||= []).push(name) }
    end

    root date_detection: false do
      field :account_id, type: 'long'

      field :text, type: 'text', value: ->(status) { [status.spoiler_text, Formatter.instance.plaintext(status)].join("\n\n") } do
        field :stemmed, type: 'text', analyzer: 'content'
      end

      field :searchable_by, type: 'long', value: ->(status, crutches) { status.searchable_by(crutches) }
      field :created_at, type: 'date'
    end
  end
end
