
#from google.appengine.api import users

import urllib
import urllib2

import webapp2
import cgi

class SmtrPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
	page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/teacher/Smtr.aspx')
	self.response.write(page.read())


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

# fetch CourseDetail data from the remote server....
class CourseDetailPage(webapp2.RequestHandler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/xml'
        #self.response.write('Hello, World!')
        smtr =  self.request.get("smtr")
	cos_id =  self.request.get("cos_id")
	cos_class =  self.request.get("class")
        page = urllib2.urlopen('http://cos.uch.edu.tw/course_info/JS/CourseDetail.aspx?smtr=' + smtr + '&cos_id=' + cos_id + '&class=' + cos_class)
        self.response.write(page.read())





application = webapp2.WSGIApplication([
    ('/fetchData/Smtr', SmtrPage),
    ('/fetchData/Dept', DeptPage),
    ('/fetchData/TeacherName', TeacherNamePage),
    ('/fetchData/TeacherCourse', TeacherCoursePage),
    ('/fetchData/TeacherNcode', TeacherNcodePage),
    ('/fetchData/CourseDetail', CourseDetailPage),
], debug=True)


