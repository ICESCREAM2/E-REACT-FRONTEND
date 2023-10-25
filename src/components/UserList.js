// src/components/UserList.js

import React from 'react';
import styled from '@emotion/styled';
import { List, ListItem, ListItemText } from '@material-ui/core';

const UserListContainer = styled.div`
  border-right: 1px solid #ddd;
  width: 30%;
  max-height: 400px;
  overflow-y: auto;
`;

const UserList = ({ users, onSelect }) => {
  return (
    <UserListContainer>
      <List component="nav">
        {users.map((user, index) => (
          <ListItem button key={index} onClick={() => onSelect(user)}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
      </List>
    </UserListContainer>
  );
};

export default UserList;
