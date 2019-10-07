import classNames from 'classnames';
import React from 'react';
import ImmutablePureComponent from 'react-immutable-pure-component';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Hashtag from 'mastodon/components/hashtag';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import Icon from 'mastodon/components/icon';

const messages = defineMessages({
  refresh_trends: { id: 'trends.refresh', defaultMessage: 'Refresh' },
});

export default class Trends extends ImmutablePureComponent {

  static defaultProps = {
    loading: false,
  };

  static propTypes = {
    trends: ImmutablePropTypes.list,
    loading: PropTypes.bool.isRequired,
    showTrends: PropTypes.bool.isRequired,
    fetchTrends: PropTypes.func.isRequired,
    toggleTrends: PropTypes.func.isRequired,
  };

  componentDidMount () {
    this.props.fetchTrends();
    this.refreshInterval = setInterval(() => this.props.fetchTrends(), 900 * 1000);
  }

  componentWillUnmount () {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  handleRefreshTrends = () => {
    this.props.fetchTrends();
  }

  handleToggle = () => {
    this.props.toggleTrends(!this.props.showTrends);
  }

  render () {
    const { intl, trends, loading, showTrends } = this.props;

    if (!trends || trends.isEmpty()) {
      return null;
    }

    return (
      <div className='getting-started__trends'>
        <div className='column-header__wrapper'>
          <h1 className='column-header'>
            <button>
              <Icon id='fire' fixedWidth />
              <FormattedMessage id='trends.header' defaultMessage='Trending now' />
            </button>

            <div className='column-header__buttons'>
              {showTrends && <button onClick={this.handleRefreshTrends} className='column-header__button' title={intl.formatMessage(messages.refresh_trends)} aria-label={intl.formatMessage(messages.refresh_trends)} disabled={loading}><Icon id='refresh' className={classNames({ 'fa-spin': loading })} /></button>}
              <button onClick={this.handleToggle} className='column-header__button'><Icon id={showTrends ? 'chevron-up' : 'chevron-down'} /></button>
            </div>
          </h1>
        </div>

        {showTrends && <div className='getting-started__scrollable'>
          {trends.take(3).map(hashtag => <Hashtag key={hashtag.get('name')} hashtag={hashtag} />)}
          <Link to='/trends' className='load-more'><FormattedMessage id='status.load_more' defaultMessage='Load more' /></Link>
        </div>}
      </div>
    );
  }

}
