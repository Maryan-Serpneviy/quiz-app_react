import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes, { InferProps } from 'prop-types'

import BackDrop from '@com/Navigation/BackDrop'
import { ILink } from '@/interfaces'
import classes from './Drawer.module.scss'

type Props = {
   isAuthorized?: boolean
   isOpen: boolean
   hideMenu: () => void
}

const Drawer: React.FC<Props> = (
   { isAuthorized, isOpen, hideMenu } : InferProps<typeof Drawer.propTypes>) => {

   const links: Array<ILink> = [
      { to: '/', label: 'Quiz List', exact: true }
   ]

   if (isAuthorized) {
      links.push({ to: '/creator', label: 'Quiz Creator', exact: false })
      links.push({ to: '/logout', label: 'Log out', exact: false })
   } else {
      links.push({ to: '/auth', label: 'Authorize', exact: false })
   }

   const renderLinks = () => {
      return links.map((link, index) => (
         <li key={index}>
            <NavLink
               to={link.to}
               activeClassName={classes.active}
               exact={link.exact}
               onClick={hideMenu}
            >
               {link.label}
            </NavLink>
         </li>
      ))
   }

   const styles: Array<string> = [classes.drawer]
   if (!isOpen) {
      styles.push(classes.open)
   }

   return (
      <>
         <nav className={styles.join(' ')}>
            <ul>
               {renderLinks()}
            </ul>
         </nav>
         {isOpen && <BackDrop hideMenu={hideMenu} />}
      </>
   )
}

Drawer.propTypes = {
   isAuthorized: PropTypes.bool,
   isOpen: PropTypes.bool.isRequired,
   hideMenu: PropTypes.func.isRequired
}

export default Drawer
