import React from 'react';
import SearchContainer from 'mastodon/features/compose/containers/search_container';
import ComposeFormContainer from 'mastodon/features/compose/containers/compose_form_container';
import NavigationContainer from 'mastodon/features/compose/containers/navigation_container';
import ModsAnnouncements from 'mastodon/features/compose/components/mods_announcements';
import LinkFooter from './link_footer';

const ComposePanel = () => (
  <div className='compose-panel'>
    <SearchContainer openInRoute />
    <NavigationContainer />
    <ComposeFormContainer singleColumn />
    <ModsAnnouncements />
    <LinkFooter withHotkeys />
  </div>
);

export default ComposePanel;
