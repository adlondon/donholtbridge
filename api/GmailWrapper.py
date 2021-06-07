#!/usr/bin/env python
from imapclient import IMAPClient, SEEN
import re

SEEN_FLAG = 'SEEN'
UNSEEN_FLAG = 'UNSEEN'


class GmailWrapper:
    def __init__(self, host, userName, password):
        #   force the user to pass along username and password to log in as
        self.host = host
        self.userName = userName
        self.password = password
        self.login()

    def login(self):
        print('Logging in as ' + self.userName)
        server = IMAPClient(self.host, use_uid=True, ssl=True)
        server.login(self.userName, self.password)
        self.server = server

    #   The IMAPClient search returns a list of Id's that match the given criteria.
    #   An Id in this case identifies a specific email
    def getEmailsBySubject(self, subject, unreadOnly=True, folder='INBOX'):
        #   search within the specified folder, e.g. Inbox
        self.setFolder(folder)

        #   build the search criteria (e.g. unread emails with the given subject)
        self.searchCriteria = [UNSEEN_FLAG, 'SUBJECT', subject]

        #   conduct the search and return the resulting Ids
        ids = self.server.search(self.searchCriteria)
        list = []
        for data in self.server.fetch(ids, 'BODY[TEXT]').items():
            replaced = re.sub("\r\n\r\n", ' ', data['BODY[TEXT]'])
            str = re.sub("\r\n", ' ', replaced)
            clean = re.search(r'inline(.*?)=3D', str).group(1)
            list.append(clean)
            return list

    def markAsRead(self, mailIds, folder='INBOX'):
        self.setFolder(folder)
        self.server.set_flags(mailIds, [SEEN])

    def setFolder(self, folder):
        self.server.select_folder(folder)
