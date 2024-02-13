import React from 'react'
import HomeFirstComp from './HomeFirstComp'
import HomeSecondComp from './HomeSecondComp'
import HomeThirdComponent from './HomeThirdComponent'
import HomeFourthComp from './HomeFourthComp'

const Home = () => {
  return (
  <>
    <div>
           <HomeFirstComp/>
    </div>
    <div>
           <HomeSecondComp/>
    </div>
    <div>
           <HomeThirdComponent/>
    </div>
    <div>
           <HomeFourthComp/>
    </div>


    </>
  )
}

export default Home