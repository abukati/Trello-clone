import React from 'react'
import Avatar from 'react-avatar'
import { PropTypes } from '../../types/prop-types'

const MemberProfile = (member: PropTypes.MemberListProps['member']) => {
  if (!member) return
  return <Avatar key={member.id} size="28" textSizeRatio={2} round={true} name={member.username} src={member.image} />
}

export default MemberProfile