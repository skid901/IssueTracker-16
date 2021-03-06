import React from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';

import ListPage from '../components/common/ListPage';
import Header from '../components/common/Header';
import MilestoneListNav from '../components/milestoneList/MilestoneListNav';
import MilestoneList from '../components/milestoneList/MilestoneList';

export default function MilestoneListPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const isClosed = query.get('is') === 'closed';

  return (
    <>
      <Helmet>
        <title>Issue Tracker - Milestone</title>
      </Helmet>
      <Header />
      <ListPage>
        <MilestoneListNav />
        <MilestoneList {...{ isClosed }} />
      </ListPage>
    </>
  );
}
