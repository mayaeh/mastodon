import { injectIntl } from 'react-intl';

import { connect } from 'react-redux';

import { fetchTrendingHashtags } from 'mastodon/actions/trends';

import { changeSetting } from '../../../actions/settings';
import Trends from '../components/trends';

const mapStateToProps = state => ({
  trends: state.getIn(['trends', 'tags', 'items']),
  loading: state.getIn(['trends', 'isLoading']),
  showTrends: state.getIn(['settings', 'trends', 'show']),
});

const mapDispatchToProps = dispatch => ({
  fetchTrends: () => dispatch(fetchTrendingHashtags()),
  toggleTrends: show => dispatch(changeSetting(['trends', 'show'], show)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Trends));
