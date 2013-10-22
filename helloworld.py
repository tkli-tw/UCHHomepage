
from google.appengine.api import users

import webapp2
import cgi

Guestbook_PAGE_HTML = """\
<html>
  <head>
    <link type="text/css" rel="stylesheet" href="/stylesheets/main.css" />
  </head>
  <body>
    <form action="/sign" method="post">
      測試看看
      <div><textarea name="content" rows="3" cols="60"></textarea></div>
      <div><input type="submit" value="Sign Guestbook"></div>
    </form>
  </body>
</html>
"""

class MainPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'text/plain'
        self.response.write('Hello, World!')

class LoginPage(webapp2.RequestHandler):

    def get(self):
    	user = users.get_current_user()
    	if user:
      		greeting = ("Welcome, %s! (<a href=\"%s\">sign out</a>)" %
                  (user.nickname(), users.create_logout_url("/intl/zh-TW/")))
    	else:
      		greeting = ("<a href=\"%s\">Sign in or register</a>." %
                  users.create_login_url("/intl/zh-TW/"))

    	self.response.out.write("<html><body>%s</body></html>" % greeting)


class GuestbookMainPage(webapp2.RequestHandler):

    def get(self):
        self.response.write(Guestbook_PAGE_HTML)


class Guestbook(webapp2.RequestHandler):

    def post(self):
        self.response.write('<html><body>You wrote:<pre>')
        self.response.write(cgi.escape(self.request.get('content')))
        self.response.write('</pre></body></html>')

application = webapp2.WSGIApplication([
    ('/test', MainPage),
    ('/code', MainPage),
    ('/code2', MainPage),
], debug=True)

application.router.add(('/test2', MainPage))
application.router.add(('/login', LoginPage))
application.router.add(('/Guest', GuestbookMainPage))
application.router.add(('/sign', Guestbook))

