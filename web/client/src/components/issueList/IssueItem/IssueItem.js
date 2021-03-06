import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import getDiffTime from '../../../utils/getDiffTime';
import COLOR from '../../../utils/color';

import { CheckItemsContext } from '../../../pages/IssueListPage';

import Label from '../../common/Label';
import ListItem from '../../common/ListItem';
import MilestoneLogo from '../../../statics/svg/milestone';
import OpenIssueLogo from '../../../statics/svg/openIssue';
import ClosedIssueLogo from '../../../statics/svg/closedIssue';
import AssigneeTag from './AssigneeTag';

const ItemInfo = styled.div`
  margin: 0 5px;
  width: 100%;
`;
const Info = styled.div`
  height: 21px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Status = styled.div`
  svg {
    fill: #${({ isClosed }) => (isClosed ? 'd73a49' : '22863a')};
  }
`;
const Title = styled.div`
  > a {
    color: #${COLOR.black};
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
`;
const LabelTag = styled.div`
  display: flex;

  > div {
    margin-left: 3px;
  }
`;
const Description = styled.div`
  margin-top: 4px;
  display: flex;
  font-size: 12px;
  color: #${COLOR.darkGray};

  > span {
    margin-right: 5px;
  }
`;
const MilestoneTag = styled.div`
  display: flex;
  align-items: center;

  svg {
    fill: #${COLOR.darkGray};
  }
  span {
    margin-left: 3px;
  }
`;

const CheckBox = styled.div`
  margin-right: 16px;
`;

export default function IssueItem({
  num,
  title,
  author,
  labels,
  assignees,
  Milestone,
  isClosed,
  createdAt,
  handleSingleCheck,
}) {
  const checkItems = useContext(CheckItemsContext);
  return (
    <ListItem isIssue={true}>
      <CheckBox>
        <input
          type="checkbox"
          onChange={event => handleSingleCheck(event.target.checked, num)}
          checked={checkItems.includes(num) ? true : false}
        />
      </CheckBox>
      <Status {...{ isClosed }}>
        {isClosed ? <ClosedIssueLogo /> : <OpenIssueLogo />}
      </Status>
      <ItemInfo>
        <Info>
          <Title>
            <Link to={`/issues/${num}`}>{title} </Link>
          </Title>
          <LabelTag>
            {labels.map(label => (
              <Label key={label.num} {...label} />
            ))}
          </LabelTag>
        </Info>
        <Description>
          <span>{`#${num} opened`}</span>
          <span>{getDiffTime(createdAt)}</span>
          <span>{`by ${author.id}`}</span>
          {Milestone && (
            <MilestoneTag>
              <MilestoneLogo />
              <span>{Milestone.title}</span>
            </MilestoneTag>
          )}
        </Description>
      </ItemInfo>
      <AssigneeTag assignees={assignees} />
    </ListItem>
  );
}
