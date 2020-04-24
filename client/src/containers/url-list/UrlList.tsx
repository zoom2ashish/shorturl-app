import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, InputBase } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState, useRef, useContext } from 'react';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddBoxIcon from '@material-ui/icons/AddBox';

import classes from './UrlList.module.scss';
import { AuthContext } from '../../providers/AuthContext';
import UrlListAxios, { setupAuthorization } from '../../url-list.axios';

interface UrlListItem {
  id: string;
  url: string;
  hashcode: string;
  created_by: string;
  created_at: number;
  redirection_url?: string;
}

const UrlList = () => {
    const [urlListState, setUrlListState] = useState<UrlListItem[]>([]);
    const [newUrlInputState, setNewUrlInputState] = useState<string>('');

    const authContext = useContext(AuthContext);
    const urlInputFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      setupAuthorization(authContext.token);
    });

    const loadUrlList = () => {
      UrlListAxios.get('/api/v1/url-management')
        .then((response) => {
          const urlList: UrlListItem[] = response.data;
          const updatedUrlList = urlList.map(urlListItem => {
            return {
              ...urlListItem,
              // redirection_url:  `http://localhost:8080/${urlListItem.hashcode}`
              redirection_url:  `${window.location.origin}/${urlListItem.hashcode}`
            };
          });

        setUrlListState(updatedUrlList);
      });
    };

    useEffect(() => {
      loadUrlList();
    }, []);

    useEffect(() => {
      if (urlInputFieldRef.current) {
        urlInputFieldRef.current.focus();
      }
    });

    const deleteUrlListItemHandler = (id: string) => {
      return () => {
        UrlListAxios.delete(`/api/v1/url-management/${id}`).then(() => {
          loadUrlList();
        });
      };
    };

    const urlInputChanged = (event: any) => {
      if (event && event.target) {
        setNewUrlInputState(event.target.value);
      }
    };

    const addUrlHandler = () => {
      if (newUrlInputState) {
        UrlListAxios.post('/api/v1/url-management/shorten', {
          url: newUrlInputState
        }).then(() => {
          loadUrlList();
        });
      }
    };

    const styles = {
      AddButtonIcon: {
        fontSize: "40px"
      }
    };

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table}>
        <TableBody>
          <TableRow key="newUrlEntry">
              <TableCell>
                <InputBase ref={urlInputFieldRef} autoFocus={true} fullWidth={true} className={classes.input}
                onChange={urlInputChanged}
                placeholder="Enter URL" inputProps={{ 'aria-label': 'Enter URL' }} />
              </TableCell>
              <TableCell align="right">
                <AddBoxIcon style={styles.AddButtonIcon} onClick={addUrlHandler} ></AddBoxIcon>
              </TableCell>
            </TableRow>
            </TableBody>
        </Table>
        <Table className={classes.table}>
          <TableBody>

            {urlListState.map(urlListItem => (
              <TableRow key={urlListItem.url}>
                <TableCell key="deleteButton">
                  <DeleteForeverIcon onClick={deleteUrlListItemHandler(urlListItem.id)} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {urlListItem.url}
                </TableCell>
                <TableCell align="right">
                  <a href={urlListItem.redirection_url} rel="noopener noreferrer" target="_blank">{urlListItem.hashcode}</a>
                </TableCell>
                <TableCell align="right">{urlListItem.created_by}</TableCell>
                <TableCell align="right">{urlListItem.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
};

export default UrlList;

