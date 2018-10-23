import { connect } from 'react-redux';
import SearchResults from '../components/search_results';
import { fetchSuggestions, dismissSuggestion } from '../../../actions/suggestions';
import { fetchTrends } from '../../../actions/trends';

const mapStateToProps = state => ({
  results: state.getIn(['search', 'results']),
  suggestions: state.getIn(['suggestions', 'items']),
  trends: state.getIn(['trends', 'items']),
});

const mapDispatchToProps = dispatch => ({
  fetchSuggestions: () => dispatch(fetchSuggestions()),
  fetchTrends: () => dispatch(fetchTrends()),
  dismissSuggestion: account => dispatch(dismissSuggestion(account.get('id'))),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
