import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { PropTypes } from 'types/prop-types'
import { Icon, PrimeBtn } from 'styled/Mixins.styled'
import { taskColors } from 'components/task/TaskPreview.styled'
import { Label } from 'components/labels/LabelPreview.styled'

type cssParams = Parameters<typeof css>

const mobileMedia = (...args: cssParams) => {
  return css`
    @media only screen and (max-width: 750px) {
      ${css(...args)};
    }
  `
}

export const TaskPageWindowOverlay = styled.div`
  display: flex;

  align-items: flex-start;
  justify-content: center;

  height: 100%;
  width: 100%;

  background-color: #000000a3;
  overflow-y: auto;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
  outline: none;

  @media only screen and (min-width: 900px) and (max-width: 1280px), only screen and (min-width: 1281px) {
    overflow-x: hidden;
  }

  ${mobileMedia({ position: 'absolute' })};
`

export const TaskPageContainer = styled.div`
  width: 768px;
  margin: 48px 0 80px;

  border-radius: 2px;
  background-color: #f4f5f7;

  position: relative;
  overflow: hidden;
  z-index: 25;

  ${mobileMedia({ margin: '36px 8px', width: '100%' })}; // maybe width auto?
`

export const TaskPageContentWrapper = styled.div`
  outline: none;
`

export const TaskPageCloseBtn = styled(Link)<PropTypes.StyledProps>`
  // TODO: Color should change according to task's cover
  ${({ size }) => Icon(size)}

  &:before {
    ${({ content }) =>
      css`
        content: ${content};
      `}
  }

  position: absolute;
  right: 0;
  top: 0;

  padding: 4px;
  margin: 4px;
  &&& {
    height: 32px;
    width: 32px;
    line-height: 32px;
  }

  border-radius: 50%;

  overflow: hidden;
  z-index: 2;
  transition: background-color 85ms, color 85ms;

  background-color: ${({ styling }) => styling?.background && '#00000014'};

  &:hover {
    cursor: pointer;
    background-color: ${({ styling }) => (styling?.background ? '#00000029' : '#091e4214')};
  }
`

export const TaskPageContent = styled.div`
  min-height: 600px;
`

export const CardCoverBox = styled.div<PropTypes.StyledProps>`
  ${({ styling }) =>
    styling?.background
      ? css`
          display: block;
          background-color: ${taskColors[styling.background].static};
          height: 116px;
        `
      : css`
          display: none;
          background-color: #091e4214;
          height: 160px;
        `}

  width: 100%;

  position: relative;
  background-repeat: no-repeat;
  background-size: initial;
  background-origin: content-box;
  background-position: left center;

  transition: opacity 85ms;
`

export const CardCoverMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 100%;
  padding: 8px;

  position: absolute;
  bottom: 0;
`

export const CardCoverMenuBtn = styled.span`
  padding: 6px 12px 6px 6px;
  border-radius: 3px;

  color: #172b4d;
  background-color: #00000014;

  &:hover {
    cursor: pointer;
    background-color: #00000029;
  }
`

export const CardCoverIcon = styled.span<PropTypes.StyledProps>`
  ${({ size }) => Icon(size)}

  &:before {
    ${({ content }) =>
      css`
        content: ${content};
      `}
  }
`

export const WindowTaskHeader = styled.div`
  position: relative;

  min-height: 32px;
  padding: 12px 40px 8px 56px;

  z-index: 1;

  ${mobileMedia({ margin: '8px 16px 8px 32px', padding: '8px 0 0 8px' })};
`

export const WindowTaskHeaderIcon = styled.span<PropTypes.StyledProps>`
  position: absolute;
  left: 15px;
  top: 20px;

  ${mobileMedia({ left: '-28px', top: '4px' })}

  ${({ size }) => Icon(size)};

  &:before {
    ${({ content }) => css`
      content: ${content};
    `}
  }
`

export const WindowTaskTitle = styled.div`
  position: relative;

  margin: 4px 0 0;
  padding: 8px 0 0;

  & > .task_details-textarea {
    display: block;
    resize: none;
    border: none;
    outline: none;
    overflow: hidden;
    overflow-wrap: break-word;

    border-radius: 3px;
    min-height: 24px;
    margin: -4px -8px;
    padding: 4px 8px;
    line-height: 24px;

    background: #0000;
    box-shadow: none;

    font-size: 20px;
    font-weight: 600;

    transition: background-color, border-color, box-shadow 85ms ease;

    &:focus {
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #0079bf;
    }
  }

  ${mobileMedia({
    margin: 0,
    padding: 0
  })}
`

export const WindowTaskListIdentifier = styled.div`
  display: inline-block;
  margin: 4px 8px 4px 2px;
`

export const ListIdentifierText = styled.p`
  margin: 0;
  padding-bottom: 0;
  color: #5e6c84;
`

export const WindowTaskMainWrapperGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  ${mobileMedia({
    gridTemplateColumns: '1fr'
  })};
`

export const MainCol = styled.div`
  margin: 0;
  padding: 0 8px 8px 16px;
  min-height: 24px;
  width: 552px;

  position: relative;
  z-index: 0;

  ${mobileMedia({
    maxHeight: 'none',
    maxWidth: 'none',
    minWidth: 0,
    width: 'auto',
    padding: '8px'
  })}
`

export const CardDetailsData = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-top: 8px;
  margin-left: 40px;

  ${mobileMedia({
    margin: '8px'
  })};
`

export const CardDetailsItem = styled.div`
  margin: 0 8px 8px 0;
  max-width: 100%;

  & > h3 {
    margin: 0 8px 4px 0;
    line-height: 20px;

    font-size: 12px;
    font-weight: 600;

    color: #5e6c84; // TODO: Will change (dark mode)

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

export const SideControlsCol = styled.div`
  padding: 0 16px 8px 8px;
  z-index: 10;
  overflow: hidden;

  ${mobileMedia({
    margin: '8px',
    padding: 0,
    width: 'auto'
  })}
`

export const CardDetailsAddItem = styled.button`
  cursor: pointer;
  display: block;

  background-color: #091e420a;

  padding: 0;
  margin: 0 8px 8px 0;

  border-radius: 3px;

  &:hover {
    background-color: #091e4214;
  }
`

export const CardDetailsAddItemIcon = styled.span<PropTypes.StyledProps>`
  ${({ size }) => Icon(size)};

  &:before {
    ${({ content }) => css`
      content: ${content};
    `}
  }

  &&& {
    box-sizing: content-box;
    font-size: 16px;
    line-height: 16px;

    height: 16px;
    width: 16px;
    padding: 8px;
  }
`

export const TaskDetailsLabel = styled(Label)<PropTypes.StyledProps>`
  box-sizing: border-box;

  height: 32px;
  padding: 0 12px;
  width: auto;

  line-height: 32px;
  font-weight: 600;
`

export const TaskDetailsDates = styled.div`
  display: flex;
  align-items: center;
  margin: 0 8px 8px 0;
`

export const TaskDatesBox = styled.div<PropTypes.StyledProps>`
  position: relative;
  flex-shrink: 0;

  border-radius: 2px;
  height: 16px;
  width: 16px;
  margin: auto 4px auto 0;

  color: #172b4d;
  white-space: nowrap;
  transition: all 0.2 ease-in-out;
  overflow: hidden;
  cursor: pointer;

  ${({ isDone }) =>
    isDone
      ? css`
          background-color: #0079bf;
          box-shadow: inset 0 0 0 2px #0079bf;
        `
      : css`
          background-color: #fafbfc;
          box-shadow: inset 0 0 0 2px #dfe1e6;
        `}

  &:hover {
    ${({ isDone }) =>
      isDone
        ? css`
            background-color: #5ba4cf;
            box-shadow: inset 0 0 0 2px #5ba4cf;
          `
        : css`
            background-color: #ebecf0;
            box-shadow: inset 0 0 0 2px #dfe1e6;
          `}
  }

  span {
    ${({ isDone }) =>
      isDone
        ? css`
            content: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E");
            opacity: 1;
          `
        : css`
          content: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="transparent" viewBox="-3 -4 16 16"><path d="M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z"/></svg>')
          opacity: 0;
        `};
    height: 16px;
    width: 16px;
  }
`

export const TaskDatePickerBtn = styled.button`
  ${PrimeBtn(undefined)}
  margin-bottom: 0;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    box-shadow: none;
    border: none;
  }
`
