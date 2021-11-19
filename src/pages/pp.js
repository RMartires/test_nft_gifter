import React, { useEffect, useState } from "react";
import { CssBaseline, Container, Button, TextField, Card, CircularProgress } from "@material-ui/core";

function PP(props) {

    useEffect(async () => {
    }, []);


    return (
        <div>
            <CssBaseline />
            <Container
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "column"
                }}
            >
                <div style={{ color: 'white' }}>
                    <h3>Privacy Policy</h3>
                    <h5>Information Collected</h5>
                    <p>Our Site collects information regarding domain names, IP address (static or dynamic IP-address that sometimes point to a particular identifiable computer or device), type of browser, operating system, time of access and referring/exit web site addresses. This information is used by PrepBootstrap. for operational purposes, to maintain service quality and to track site trends and statistics. Most of the time, this information does not personally identify you.

                        We also collect any personal information that you choose to provide when you use this Site. This may include, but is not limited to the events when you: create an account, order and/or download products, contact our sales department, post content in our forums or interact with other areas of our support center. This information of personal nature may include, your name, e-mail address, and any other information selected by you to share. We may collect any additional personal information you knowingly and voluntarily provide through such posting, contact or interaction, in cases when you post content in the forums, interact with other areas of our support center, or contact our sales department or support teams, In case you sign up for any PrepBootstrap. newsletter, webinar, survey, other communication or you just want to make general contact with us, we will collect information of your contact to fulfill your request. In case you wan to unsubscribe, follow the unsubscribe link that appears at the end of each communication or, you may unsubscribe via your account preferences.</p>

                    <h5>Use, Sharing or Disclosing of Personal Information</h5>
                    <p>Please note that we do not sell or rent your personal information to any third party. The main purpose we use your personal for is to communicate with you in the most efficient manner. We may share, disclose, or provide your personal information with or to a third party: (i) in cases when we attempt to collect a payment or debt, (ii) when we are required to combat fraud or to protect our interests, (iii) in order to enforce the Terms of Use of this Site or other PrepBootstrap. Sites, (iv) in cases when we are required to do so by law or in order to respond to legal process or lawful requests, including from law enforcement or government agencies, (v) within and among our affiliates and subsidiaries, or (vi) as part of a merger or sale of a business. We may use or share your personal information for the purpose of delivering correspondence, communications, or services, such as newsletters, events, training or software that you request or purchase, as well as to make a notification to you about the status of your order. Any information you have provided may be used by us for the purpose of providing customer support to you. Note that, these third parties are authorized to use your personal information ONLY for the sole purpose of providing these services to us.</p>

                    <h5>Information Security</h5>
                    <p>We make sure that appropriate security measures are taken to protect your personal information from unauthorized access, alteration, use or disclosure. Among these measures are a variety of security technologies and procedures like data collection internal reviews, practices regarding storage and processing and also security measures and appropriate encryption and physical security measures. We use Secure Socket Layer (SSL) certificates to encrypt the transmission of data on the PrepBootstrap. payment and login pages. Please note that no transmission via the internet can be fully secure, therefore, on your side you are also responsible for taking the necessary measures for protection of your personal information from unauthorized access, use or disclosure, including protection of your password. Apart from the indications under “Use, Sharing or Disclosing of Personal Information”, access to your personal information is restricted ONLY to PrepBootstrap. employees, contractors and agents who need to know that information so that they can process it and provide personalized customer support to you. Note that these individuals are bound by strict confidentiality obligations and may be subject to discipline, including termination in case they fail to comply with these complications.</p>

                    <footer class="site-footer">
                        <div class="container">
                            <div class="site-footer-inner has-top-divider">
                                <div class="footer-copyright">&copy; 2021 TophatTurtle, all rights reserved</div>
                                <ul class="footer-social-links list-reset">
                                    <li>
                                        <a href="https://twitter.com/RohitMartires" target='_blank'>
                                            <span class="screen-reader-text">Twitter</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#FFFFFF" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto: info@tophatturtle.in" target='_blank'>
                                            <span class="screen-reader-text">Email</span>
                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#FFFFFF" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </Container>
        </div>
    );
}

export default PP;