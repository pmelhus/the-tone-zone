import styled from 'styled-components';

export const Box = styled.div`
  padding: 60px 40px 40px 40px;
  background: white;
  bottom: 0;
  width: 100%;


  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  // grid-template-columns: repeat(auto-fill,
  //                        minmax(185px, 1fr));
  // grid-gap: 20px;
  justify-content: space-evenly;

  @media (max-width: 1000px) {
    // grid-template-columns: repeat(auto-fill,
    //                        minmax(200px, 1fr));
  }
`;

export const FooterLink = styled.a`
  color: black;
  margin-bottom: 14px;
  font-size: 12px;
  text-decoration: none;

  &:hover {
      color:  rgb(255, 85, 0);
      transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 14px;
  color: black;
  margin-bottom: 28px;
  font-weight: bold;
`;
