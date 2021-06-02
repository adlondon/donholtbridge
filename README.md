***NOTE: This project has been abandoned. I've lost access to the RMTP traffic streams and the site is no longer live***

The Don Holt in Charleston is one of two bridges connecting Mt. Pleasant and the rest of Charleston County. The bridge is often backed up with heavy traffic, and occaisionally [closes](https://www.postandcourier.com/news/scdot-calls-don-holt-bridge-tarpageddon-an-unprecedented-failure-as-investigation-continues/article_b994ef58-6f02-11e7-aad8-678394eda5ca.html). Since a large number of commuters (including myself) rely on this bridge to get home, I wanted to create an easy way to check the status of it. Heavily inspired by my good friend [Sean McCambidge's](http://seanmccambridge.com/) website https://isthecooperriverbridgeclosed.com, I wanted to find a way to automate the process and display real time updates to the site.


The SCDOT will send an email or text message to you alerting you if a specific section of highway has an incident, including heavy traffic and bridge closures. They also have live traffic streams on the [511SC](https://www.511sc.org/#zoom=6.7722765789673165&lon=-79.93603526341269&lat=33.94704049555385&dmsg&rest&cams&other&har&cong&wthr&acon&incd&trfc) site, with unique stream URLs for each camera.

**Approach**:
- Sign up for email alerts for traffic on the bridge with a Gmail address.
- Use a Raspberry Pi to fetch unread emails from that account using [IMAPClient](https://imapclient.readthedocs.io/en/master/) every minute.
- Parse unread emails for the traffic update text, and post the body of that email to a realtime Firebase DB.
- Consume updates by the FE and parse for human readability, checking for the phrases 'all lns blkd' or 'all lns clsd' to set the closure status.
- Display different traffic camera streams in the browser with [JW Player](https://www.jwplayer.com/).
