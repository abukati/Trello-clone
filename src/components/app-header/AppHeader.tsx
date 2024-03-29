import React, { useEffect, useState } from 'react'
import { Header, HeaderMainNav, HeaderLinksWrapper, HeaderLinksContainer, HeaderLinks, HeaderRightChunk } from './AppHeader.styled'
import { ReactComponent as CreateIcon } from 'assets/images/plus.svg'
import AppLogo from './logo/AppLogo'
import NavLinks from './links/NavLinks'
import NavLink from './links/NavLink'
// import RightChunk from './right-chunk/RightChunk'

const AppHeader = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [modalPos, setModalPos] = useState({ left: 0, top: 0 })

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })

  useEffect(() => {
    if (isMenuOpen && windowWidth > 1000) {
      setIsMenuOpen(false)
    }
  }, [windowWidth, isMenuOpen])

  const positionCalc = React.useCallback(
    (ev: React.MouseEvent) => {
      if (!isMenuOpen && ev.target instanceof Element) {
        const { x: left, y: top, height: elemHeight } = ev.currentTarget.getBoundingClientRect()
        setModalPos({ left, top: top + elemHeight + 10 })
      }
    },
    [isMenuOpen]
  )

  const handleMenuToggle = (ev?: React.MouseEvent) => {
    // TODO: useEffect here might help with toggling correctly
    ev?.stopPropagation()
    if (isMenuOpen) {
      setIsMenuOpen(false)
    } else {
      positionCalc(ev!)
      setIsMenuOpen(true)
    }
  }

  return (
    <Header>
      <HeaderMainNav>
        <AppLogo />
        <HeaderLinksWrapper>
          <HeaderLinksContainer>
            <HeaderLinks>
              <NavLinks handleMenuToggle={handleMenuToggle} windowWidth={windowWidth} isMenuOpen={isMenuOpen} modalPos={modalPos} />
            </HeaderLinks>
            <HeaderLinks>
              <NavLink type="Create">{windowWidth < 1100 ? <CreateIcon style={{ width: '20px', height: '20px' }} /> : 'Create'}</NavLink>
            </HeaderLinks>
          </HeaderLinksContainer>
        </HeaderLinksWrapper>
        <HeaderRightChunk>{/* <RightChunk /> */}</HeaderRightChunk>
      </HeaderMainNav>
    </Header>
  )
}

export default AppHeader
