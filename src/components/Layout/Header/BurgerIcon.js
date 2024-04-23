export default function BurgerIcon() {
  return <div className="lg:hidden">BurgerIcon</div>;
}

// import React from 'react';
// import styled from 'styled-components'
// import breakpoint from 'styled-components-breakpoint';

// const Index = ({ onClick, isNavOpen }) => {

//   return (
//     <StyledContainer onClick={() => onClick()} isNavOpen={isNavOpen}>
//       <div>
//         <span></span>
//         <span></span>
//         <span></span>
//       </div>
//     </StyledContainer>
//   );
// }

// const StyledContainer = styled.div`
//   margin-left: auto;
//   display:grid;
//   place-items:center;
//   transform: scale(.5);
//   ${breakpoint('lg')`
//     display: none;
//   `}
//   div {
//     display:flex;
//     flex-direction:column;
//     width:70px;
//     cursor:pointer;
//     span {
//       background: ${props => props.theme.colors.brand};
//       border-radius:10px;
//       height:7px;
//       margin: 7px 0;
//       transition: .4s  cubic-bezier(0.68, -0.6, 0.32, 1.6);
//       &:nth-of-type(1){
//         width:50%;
//         ${props => props.isNavOpen ? 'transform-origin : bottom' : ''};
//         ${props => props.isNavOpen ? 'transform: rotatez(45deg) translate(8px, 0px)' : ''};
//       }
//       &:nth-of-type(2){
//         width:100%;
//         ${props => props.isNavOpen ? 'transform-origin : top' : ''};
//         ${props => props.isNavOpen ? 'transform:rotatez(-45deg)' : ''};
//       }
//       &:nth-of-type(3){
//         ${props => props.isNavOpen ? 'width:50%' : 'width:75%'};
//         ${props => props.isNavOpen ? 'transform-origin : bottom' : ''};
//         ${props => props.isNavOpen ? 'transform: translate(30px,-11px) rotatez(45deg)' : ''};
//       }
//     }
//   }
// `

// export default Index;
