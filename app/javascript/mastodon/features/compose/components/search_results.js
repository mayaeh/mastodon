import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import AccountContainer from '../../../containers/account_container';
import StatusContainer from '../../../containers/status_container';
import ImmutablePureComponent from 'react-immutable-pure-component';
import Hashtag from '../../../components/hashtag';

const messages = defineMessages({
  dismissSuggestion: { id: 'suggestions.dismiss', defaultMessage: 'Dismiss suggestion' },
});

export default @injectIntl
class SearchResults extends ImmutablePureComponent {

  static propTypes = {
    results: ImmutablePropTypes.map.isRequired,
    suggestions: ImmutablePropTypes.list.isRequired,
    fetchSuggestions: PropTypes.func.isRequired,
    dismissSuggestion: PropTypes.func.isRequired,
    trends: ImmutablePropTypes.list,
    fetchTrends: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  componentDidMount () {
    this.props.fetchSuggestions();
    this.props.fetchTrends();
  }

  render () {
    const { intl, results, suggestions, dismissSuggestion, trends } = this.props;

    if (results.isEmpty() && !suggestions.isEmpty()) {
      return (
        <div className='search-results'>
          <div className='trends'>
            <div className='trends__header'>
              <i className='fa fa-user-plus fa-fw' />
              <FormattedMessage id='suggestions.header' defaultMessage='You might be interested in…' />
            </div>

            {suggestions && suggestions.map(accountId => (
              <AccountContainer
                key={accountId}
                id={accountId}
                actionIcon='times'
                actionTitle={intl.formatMessage(messages.dismissSuggestion)}
                onActionClick={dismissSuggestion}
              />
            ))}
          </div>
        </div>
      );
    }

    let accounts, statuses, hashtags;
    let count = 0;

    if (results.isEmpty()) {
      return (
        <div className='search-results'>
          <div className='trends'>
            <div className='trends__header'>
              <Icon id='fire' fixedWidth />
              <FormattedMessage id='trends.header' defaultMessage='Trending now' />
            </div>

            {trends && trends.map(hashtag => <Hashtag key={hashtag.get('name')} hashtag={hashtag} />)}
          </div>
        </div>
      );
    }

    if (results.get('accounts') && results.get('accounts').size > 0) {
      count   += results.get('accounts').size;
      accounts = (
        <div className='search-results__section'>
          <h5><i className='fa fa-fw fa-users' /><FormattedMessage id='search_results.accounts' defaultMessage='People' /></h5>

          {results.get('accounts').map(accountId => <AccountContainer key={accountId} id={accountId} />)}
        </div>
      );
    }

    if (results.get('statuses') && results.get('statuses').size > 0) {
      count   += results.get('statuses').size;
      statuses = (
        <div className='search-results__section'>
          <h5><i className='fa fa-fw fa-quote-right' /><FormattedMessage id='search_results.statuses' defaultMessage='Toots' /></h5>

          {results.get('statuses').map(statusId => <StatusContainer key={statusId} id={statusId} />)}
        </div>
      );
    }

    if (results.get('hashtags') && results.get('hashtags').size > 0) {
      count += results.get('hashtags').size;
      hashtags = (
        <div className='search-results__section'>
          <h5><i className='fa fa-fw fa-hashtag' /><FormattedMessage id='search_results.hashtags' defaultMessage='Hashtags' /></h5>

          {results.get('hashtags').map(hashtag => <Hashtag key={hashtag.get('name')} hashtag={hashtag} />)}
        </div>
      );
    }

    return (
      <div className='search-results'>
        <div className='search-results__header'>
          <i className='fa fa-search fa-fw' />
          <FormattedMessage id='search_results.total' defaultMessage='{count, number} {count, plural, one {result} other {results}}' values={{ count }} />
        </div>

        {accounts}
        {statuses}
        {hashtags}
      </div>
    );
  }

}
