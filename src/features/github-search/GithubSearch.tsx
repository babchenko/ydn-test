import React, {useState} from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import {
    fetchUsersAction,
    selectUsers,
    selectSearch,
    setSearch,
    selectUserStatus
} from 'features/github-search/githubUserSlice'
import {useAppDispatch, useAppSelector} from 'app/hooks';
import GithubResultsList from 'components/github-results/github-results-lists';

const ENTER_KEY_CODE = 13;

export function GithubSearch() {
    const [username, setUsername] = useState('');
    const dispatch = useAppDispatch();
    const {users} = useAppSelector(selectUsers);
    const search = useAppSelector(selectSearch);
    const loading = useAppSelector(selectUserStatus);

    const searchUserByEnter = (e: React.KeyboardEvent<object>): void => {
        const keyCode = e.keyCode;
        if (keyCode === ENTER_KEY_CODE && username.length) {
            dispatch(setSearch(username));
            dispatch(fetchUsersAction(username));
        }
    }

    const searchOnSubmit = (e: React.FormEvent<object>): void => {
        e.preventDefault();
        if (username.length) {
            dispatch(setSearch(username));
            dispatch(fetchUsersAction(username));
        }
    }

    return (
        <Container className='main'>
            <Row>
                <Col>
                    <Form onSubmit={searchOnSubmit}>
                        <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                            <Form.Control onChange={(e) => setUsername((e.target.value))} value={username} type='text'
                                          placeholder='Enter username' onKeyUp={searchUserByEnter}/>
                        </Form.Group>
                        <div className='d-grid gap-2'>
                            <Button size='lg' type='submit' variant='primary'>Search</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    {search.length && loading !== 'loading' ? <div className='mg--top-20'>Showing users for "{search}"</div> : null}
                    <GithubResultsList users={users}/>
                </Col>
            </Row>
        </Container>
    );
}
