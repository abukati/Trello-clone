import React from 'react'
import * as boardInterfaces from '../../interfaces/board.interface'
import TaskPreview from '../task/TaskPreview'
import ListPreviewContainer from './ListPreview.styled'

interface listProps {
  list: boardInterfaces.list
}

const ListPreview = ({ list }: listProps) => {
  return (
    <ListPreviewContainer>
      <div>{list.title} | {list.id}</div>
      {list.tasks?.map(task => (
        <TaskPreview key={task.id} task={task} />
      ))}
    </ListPreviewContainer>
  )
}

export default ListPreview