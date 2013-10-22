
#from google.appengine.api import users

import urllib
import urllib2

import webapp2
import cgi

class mainfunction(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'
        #self.response.write('Hello, World!')
	#page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/Smtr.aspx')

	#self.response.write(page.read())
	f = open('dataSource/mainfunction.json','r')
	filecontent = ""
	while 1:
	    line = f.readline()
	    if not line:break
	    filecontent += line

	f.close()
	self.response.write(filecontent)


# fetch dept data from the remote server....
class DeptPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
        page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/Dept.aspx')
        self.response.write(page.read())


# fetch TeacherName data from the remote server....
class TeacherNamePage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
	smtr = self.request.get("smtr")
	deptc =  self.request.get("deptc")
        page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/TeacherName.aspx?smtr='+smtr + '&deptc=' + deptc)
        self.response.write(page.read())


# fetch TeacherCourse data from the remote server....
class TeacherCoursePage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
        smtr = self.request.get("smtr")
        name =  self.request.get("name")
        page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/TeacherCourse.aspx?smtr='+smtr + '&name=' + name)
        self.response.write(page.read())

# fetch TeacherCourse data from the remote server....
class TeacherNcodePage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
        name =  self.request.get("name")
        page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/TeacherNcode.aspx?name=' + name)
        self.response.write(page.read())






application = webapp2.WSGIApplication([
    ('/data/mainfunction', mainfunction),
], debug=True)


