import React, { useLayoutEffect, useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

import { boardService } from '../../services/board.service'
import useLocalStorageState from '../../hooks/useLocalStorageState'
import { BoardTypes } from '../../types/board-types/index'

import { BoardContainer, BoardContentWrapper, BoardWrapper, AppWrapper } from './Board.styled'
import { ListPreviewContainer } from '../../components/list/ListPreview.styled'

import labelsContext from '../../contexts/labelsContext'
import BoardNav from '../../components/board/board-navbar/BoardNav'
import BoardSidebar from '../../components/board/board-sidebar/Sidebar'
import ListPreview from '../../components/list/ListPreview'
import ListComposer from '../../components/board/list-composer/ListComposer'

const Board = () => {
  const [board, setBoard] = useLocalStorageState('board', boardService.getBoardById())
  const [isSidenavOpen, setIsSidenavOpen] = useState(false)
  const [isLabelsExpanded, setIsLabelsExpanded] = useState(false)

  useLayoutEffect(() => {
    const elRoot = document.getElementById('root')
    if (elRoot) elRoot.style.background = board.style.background
  }, [board.style.background])

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, type, draggableId } = result

    if (!board || !board.lists || !destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const args = { board, destination, draggableId, source }
    const newLists = type === 'LIST' ? boardService.handleListMove(args) : boardService.handleTaskMove(args)

    const newBoard = {
      ...board,
      lists: newLists
    }
    onBoardUpdate(newBoard)
  }

  const onAddList = (listTitle: string): void => {
    const newList = boardService.getEmptyList()
    newList.title = listTitle

    onListUpdate(newList)
  }

  const onListUpdate = (newList: BoardTypes.list): void => {
    const idx = board.lists!.findIndex((list: BoardTypes.list) => list.id === newList.id)

    const newLists = [...board.lists!]

    if (idx !== -1) {
      newLists.splice(idx, 1, newList)
    } else {
      newLists.push(newList)
    }

    const newBoard = {
      ...board,
      lists: newLists
    }
    onBoardUpdate(newBoard)
  }

  const onLabelsUpdate = (newLabels: BoardTypes.label[]): void => {
    const newBoard = {
      ...board,
      labels: newLabels
    }

    onBoardUpdate(newBoard)
  }

  const onBoardUpdate = (newBoard: BoardTypes.board): void => {
    // dispatch({ type: 'BOARD_UPDATE', payload: newBoard })
    setBoard(newBoard)
  }

  const toggleSidenav = (): void => {
    setIsSidenavOpen(prev => !prev)
  }

  if (!board) return <div>loading...</div>
  return (
    <BoardContainer>
      <BoardContentWrapper>
        <AppWrapper>
          <div style={{ position: 'absolute', inset: '0' }}>
            <BoardWrapper isSidenavOpen={isSidenavOpen}>
              <BoardNav onSidenavOpen={toggleSidenav} onBoardUpdate={onBoardUpdate} board={board} />
              <div style={{ flexGrow: 1, position: 'relative' }}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable direction="horizontal" droppableId="board" type="LIST">
                    {provided => (
                      <ListPreviewContainer {...provided.droppableProps} ref={provided.innerRef}>
                        <labelsContext.Provider value={{ isLabelsExpanded, setIsLabelsExpanded }}>
                          {board.lists?.map((list, index) => {
                            const listPreviewProps = {
                              key: list.id,
                              list,
                              index,
                              onLabelsUpdate,
                              onListUpdate
                            }
                            return <ListPreview {...listPreviewProps} />
                          })}
                          {provided.placeholder}
                          <ListComposer onAddList={onAddList} />
                        </labelsContext.Provider>
                      </ListPreviewContainer>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </BoardWrapper>
            <BoardSidebar isSidenavOpen={isSidenavOpen} onSidenavClose={toggleSidenav} />
          </div>
        </AppWrapper>
      </BoardContentWrapper>
    </BoardContainer>
  )
}

export default Board
