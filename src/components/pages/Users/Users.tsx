import React, { useEffect, useState } from 'react'

import Header from '../../blocks/Header/Header'
import Modal from '../../blocks/Modal/Modal'

import api from '../../../services/api'
import storage from '../../../services/storage'

import {
  FaTrashAlt as DeleteIcon,
  FaUser as UserIcon
} from 'react-icons/fa'

import styles from './Users.style'
import util from '../../../utils/styles'
import { UserModel } from '../../../@types'
import { RouteComponentProps } from 'react-router'

const Users: React.FC<RouteComponentProps> = ({ history }) => {
  const [users, setUsers] = useState<UserModel[]>()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState<string>()
  const isAdmin = storage.read('user').access_level === 'admin'

  useEffect(() => {
    (async () => {
      const result = await api.request({
        method: 'get',
        route: '/user/list'
      })

      if (result?.status === 200) {
        setUsers(result?.data?.users)
        setLoading(false)
      } else {
        history.push('/login')
      }
    })()
  }, [])

  const remove = async () => {
    setShowModal(false)
    setLoading(true)

    const result = await api.request({
      method: 'delete',
      route: '/user/delete',
      query: {
        id: userId
      }
    })

    if (typeof result?.status === 'number') {
      window.location.reload()
    }
  }

  return <styles.main>
    {showModal ?
      <Modal
        message='Você tem certeza?'
        taskOnYes={remove}
        taskOnNo={() => {
          setShowModal(false)
        }}
      />
      : null
    }

    <Header
      title='Lista de usuários'
      backButton={() => {
        history.push('/settings')
      }}
    />

    {!loading ?
      users?.length ?
        <styles.list>
          <util.classicButton
            onClick={() => {
              history.push('/user')
            }}
          >
            Novo usuário
          </util.classicButton>
          {users.map((user, index) =>
            <styles.container
              key={index}
            >
              <styles.user
                onClick={() => {
                  history.push(`/user?${user.id}`)
                }}
              >
                <UserIcon
                  className='icon'
                />
                <styles.infos>
                  <p
                    className='name'
                  >
                    {user.username}
                  </p>
                  <p>{user.email}</p>
                  {user?.is_admin ?
                    <p
                      className='status'
                    >
                      Professor/Técnico
                    </p>
                    : null
                  }
                </styles.infos>
              </styles.user>

              {isAdmin ?
                <DeleteIcon
                  className='icon'
                  onClick={() => {
                    setUserId(user.id)
                    setShowModal(true)
                  }}
                />
                : null
              }
            </styles.container>
          )}
        </styles.list>
        :
        <styles.noUser>
          <util.classicButton
            onClick={() => {
              history.push('/user')
            }}
          >
            Novo usuário
          </util.classicButton>

          <p>Não há usuários cadastrados.</p>
        </styles.noUser>
      :
      <styles.loading
        data-testid='loading'
      >
        <util.circularProgress />
      </styles.loading>
    }
  </styles.main>
}

export default Users