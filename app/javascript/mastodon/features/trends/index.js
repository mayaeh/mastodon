import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl';
import Column from 'mastodon/features/ui/components/column';
import ColumnHeader from 'mastodon/components/column_header';
import { ImmutableHashtag as Hashtag } from 'mastodon/components/hashtag';
import classNames from 'classnames';
import { fetchTrendingHashtags } from 'mastodon/actions/trends';
import Icon from 'mastodon/components/icon';

const messages = defineMessages({
  title: { id: 'trends.header', defaultMessage: 'Trending now' },
  refreshTrends: { id: 'trends.refresh', defaultMessage: 'Refresh trends' },
});

const mapStateToProps = state => ({
  trends: state.getIn(['trends', 'tags', 'items']),
  loading: state.getIn(['trends', 'tags', 'isLoading']),
});

const mapDispatchToProps = dispatch => ({
  fetchTrends: () => dispatch(fetchTrendingHashtags()),
});

@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
export default class Trends extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    trends: ImmutablePropTypes.list,
    fetchTrends: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    multiColumn: PropTypes.bool,
  };

  componentDidMount () {
    this.props.fetchTrends();
  }

  handleRefresh = () => {
    this.props.fetchTrends();
  }

  render () {
    const { trends, loading, intl, multiColumn } = this.props;

    return (
      <Column bindToDocument={!multiColumn} label={intl.formatMessage(messages.title)}>
        <ColumnHeader
          icon='fire'
          title={intl.formatMessage(messages.title)}
          showBackButton
          multiColumn={multiColumn}
          extraButton={(
            <button className='column-header__button' title={intl.formatMessage(messages.refreshTrends)} aria-label={intl.formatMessage(messages.refreshTrends)} onClick={this.handleRefresh}><Icon id='refresh' className={classNames({ 'fa-spin': loading })} /></button>
          )}
        />

        <div className='scrollable'>
          {trends && trends.map(hashtag => <Hashtag key={hashtag.get('name')} hashtag={hashtag} />)}
        </div>
      </Column>
    );
  }

}
