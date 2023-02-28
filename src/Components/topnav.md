<section className='topnav'>

          <div className='nav large'>
            <a className='nav large Queup' href="/"><img src="Images/logo.png" alt="" /></a>
            {auth  ? <NavLink to='account' className='routes'>Account</NavLink> :<button onClick={loginmodal} id='logbutton' className='routes'>Login</button>}

            {auth  ? <NavLink  to='Overview' className='routes'>Business</NavLink> :<button onClick={signupmodal} className='routes' id='regbutton'>Sign Up</button>}

            <NavLink to='/' className='routes'>Rewards</NavLink>

            {auth  ? <button style={{color: '#865c3ace'}} onClick={e => session.logout()} className='routes'>Logout</button> :<NavLink to='/' className='routes' id='regbutton'>Contact</NavLink>}
          </div>
        <>
          <input className='searchbar' id='searchbar' type="text" placeholder='Search Queup...' onChange={e => {setValue(e.target.value)}}/>
          <div className='searchbtn'><AiOutlineSearch color='white'/></div>
          <button className='nav mobile'><AiOutlineSearch size={25} onClick={Searchicon}/></button>
          <a className='nav mobile' href='/' id='Q'><h3>Q</h3></a>
          <button className='nav mobile'><NavLink style={{all: 'unset', display: 'flex', justifyContent: 'center', alignItems: 'center'}} to={auth ? '/account' : '/auth'}><BsPersonFill size={25}/></NavLink></button> 
        </>
      </section>

      <div className="log"><Log/></div>
      <div className="register"><Reg/></div>
      <div className="results"><Results value={value}/></div>

      <section className='mobilemenu'>
        <div/>
        <button id='burger' onClick={menu}> <div className='burger'/> <p>menu</p></button>
        
        <div className='sidenav'>
          <div className='search'>
            <div><AiOutlineSearch size={25} color='#ffffffda'/></div>
            <input type="search" placeholder='Search Queup...' id='searchfield' onChange={e => setValue(e.target.value)}/>
          </div>
          <div className='searches'>
            {results.map(searches => {
              return (
                <NavLink onClick={menu} to={'/store/' + searches} className='routes' key={searches}>{searches}</NavLink>
              )
            })}
            {results.length < 5 ? <p style={{color: 'white', display: 'flex', justifyContent: 'center', width: '100vw', margin: 'auto', fontSize: '.8rem'}}>------ End of Results ------</p> : <></>}
          </div>
          <div className='mobilenav'>
            <NavLink onClick={menu} to='/' id='logbutton' className='routes'><RiHome2Line color='white' size={25}/>Homepage</NavLink>

            {auth  ? <NavLink onClick={menu} to='account' className='routes'><MdManageAccounts color='white' size={25}/>Account</NavLink>
            :<NavLink onClick={menu} to='auth' id='logbutton' className='routes'><RiLoginBoxLine color='white' size={25}/>Login</NavLink>}

            {auth  ? <NavLink onClick={menu} to='Overview' className='routes'><IoBusinessOutline color='white' size={25}/>Business</NavLink>
            :<NavLink onClick={menu} to='/reg' className='routes' id='regbutton'><AiOutlineUserAdd color='white' size={25}/>Sign Up</NavLink>}

            <NavLink onClick={menu} to='/' className='routes'><IoRibbonOutline color='white' size={25}/>Rewards</NavLink>

            {auth  ? <button style={{color: '#865c3ace', justifyContent: 'unset'}} onClick={e => session.logout()} className='routes'><CgLogOut color='white' size={25}/>Logout</button>
            :<NavLink onClick={menu} to='/' className='routes' id='regbutton'><MdLeakAdd color='white' size={25}/>Contact</NavLink>}
          </div>
        </div>
      </section>