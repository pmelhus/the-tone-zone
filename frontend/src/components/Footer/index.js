import React from "react";
import ButtonMailto from "./ButtonMailto";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <Container>
        <Row>
          {/* <Column>
			<Heading>About Me</Heading>
			<FooterLink href="#">Aim</FooterLink>
			<FooterLink href="#">Vision</FooterLink>
			<FooterLink href="#">Testimonials</FooterLink>
		</Column> */}
          {/* <Column>
			<Heading>Services</Heading>
			<FooterLink href="#">Writing</FooterLink>
			<FooterLink href="#">Internships</FooterLink>
			<FooterLink href="#">Coding</FooterLink>
			<FooterLink href="#">Teaching</FooterLink>
		</Column> */}
          <Column>
            <Heading>Contact Me</Heading>
            <FooterLink href="https://pmelhus.github.io">
              Paul-Eirik Melhus
            </FooterLink>
            <FooterLink href="https://www.github.com/pmelhus">
              Github
            </FooterLink>
            <FooterLink href="#">
              <ButtonMailto label="Email" mailto="mailto:pmelhus@gmail.com" />
            </FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://www.linkedin.com/in/paulmelhus/">
              <i className="fab fa-linkedin-in">
                <span style={{ marginLeft: "10px" }}>LinkedIn</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.facebook.com/pauleirik.melhus">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>Facebook</span>
              </i>
            </FooterLink>
            <FooterLink href="https://www.instagram.com/paulmelhus/">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>Instagram</span>
              </i>
            </FooterLink>

            {/* <FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink> */}
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
