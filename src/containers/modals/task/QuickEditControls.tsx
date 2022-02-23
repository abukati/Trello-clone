import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { TaskQuickEditorControls, TaskQuickEditorControlBtn, EditorControlBtnIcon, EditorControlText } from './QuickEdit.styled'
import { PropTypes } from '../../../types/prop-types'
import useOutsideAlerter from '../../../hooks/useOutsideAlerter'
import BadgesModal from './badges/BadgesModal'
import LabelsModal from './badges/labels/LabelsModal'

const QuickEditControls = ({ handleTaskLabelChange, task, onLabelsUpdate }: PropTypes.QuickEditorProps) => {
  const [quickControls] = useState([
    { title: 'Open card', type: 'openCard', icon: `'\\e912'`, href: `/${task.id}` },
    { title: 'Edit labels', type: 'labels', icon: `'\\e93f'` },
    { title: 'Change members', type: 'members', icon: `'\\e946'` },
    { title: 'Edit dates', type: 'dates', icon: `'\\e91b'` }
  ])
  const [badgeModal, setBadgeModal] = useState<string | null>(null)
  const [modalPos, setModalPos] = useState({ top: 0, left: 0 })
  const modalWrapperRef = useRef<HTMLDivElement>(null)
  const outsideAlerter = useOutsideAlerter(modalWrapperRef)

  const toggleBadgeModal = useCallback(
    (modalName?: string, ev?: React.MouseEvent) => {
      if (typeof modalName !== 'string' || modalName === badgeModal) {
        return setBadgeModal(null)
      }
      if (ev && modalName) {
        const { y: top, x: left, height } = ev.currentTarget.getBoundingClientRect()
        setModalPos({ top: top + height + 5, left })
        setBadgeModal(modalName)
      }
    },
    [badgeModal]
  )

  useLayoutEffect(() => {
    if (outsideAlerter) {
      setBadgeModal(null)
    }
  }, [outsideAlerter])

  const getModalChild = () => {
    switch (badgeModal) {
      case 'labels':
        return <LabelsModal onLabelsUpdate={onLabelsUpdate} task={task} handleTaskLabelChange={handleTaskLabelChange} />
      case 'members':
        return <>members</>
      case 'dates':
        return <>dates</>
      default:
        return
    }
  }

  // handle task badges updates. update all or individual badges

  return (
    <TaskQuickEditorControls>
      {quickControls.map(control => (
        <TaskQuickEditorControlBtn onClick={ev => toggleBadgeModal(control.type, ev)} href={control.href} key={control.icon}>
          <EditorControlBtnIcon content={control.icon} size="sm" />
          <EditorControlText>{control.title}</EditorControlText>
        </TaskQuickEditorControlBtn>
      ))}
      {badgeModal && (
        <BadgesModal modalWrapperRef={modalWrapperRef} modalPos={modalPos} title={badgeModal} onClose={toggleBadgeModal}>
          {getModalChild()}
        </BadgesModal>
      )}
    </TaskQuickEditorControls>
  )
}

export default QuickEditControls