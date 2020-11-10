import React from 'react';

import LabelItem from './LabelItem';
import ListBody from '../common/ListBody';

export default function LabelListBody({ labels }) {
  return (
    <ListBody>
      {labels.length &&
        labels.map(label => <LabelItem key={label.num} {...label} />)}
    </ListBody>
  );
}