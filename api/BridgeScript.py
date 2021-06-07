#!/usr/bin/env python
from GmailWrapper import GmailWrapper
from firebase import firebase

import time

HOSTNAME = 'imap.gmail.com'
USERNAME = '<gmail_username>'
PASSWORD = '<gmail_application_auth_password>'


def checkGmail():
    gmailWrapper = GmailWrapper('imap.gmail.com', USERNAME, PASSWORD)
    # the email that the SCDOT sends out always contains 'METmessage' as the subject
    emails = gmailWrapper.getEmailsBySubject('METmessage')
    if(len(emails) > 0):
        try:
            sendToFirebase(emails)
            gmailWrapper.markAsRead(emails)
        except:
            print("Failed to find updated emails")


def sendToFirebase(emails):
    Firebase = firebase.FirebaseApplication(
        'https://bridge-1575994869243.firebaseio.com')
    email = emails[-1]
    Firebase.post('/status', {'status': email})


if __name__ == '__main__':
    checkGmail()
