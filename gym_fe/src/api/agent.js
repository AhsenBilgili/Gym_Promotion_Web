import axios from "axios";

axios.defaults.baseURL = "http://localhost:63652/api/";


const responseBody = (response) => response.data;

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Facilities = {
  list: () => requests.get("Facilities/facilities"),
  details: (id) => requests.get(`Facilities/${id}`)

};
const SpecialCourse={
  list: ()=> requests.get("SpecialCourses/getcourses"),
  details: (id) => requests.get(`SpecialCourses/${id}`),
  trainers:()=>requests.get("Facilities/all-trainers")
};

const Account={
  login:(values)=>requests.post('Account/login',values),
  register:(values)=>requests.post('Account/register',values),
  currentUser:()=>requests.get('Account/currentUser')
}
const Prices={
  list: ()=> requests.get("CoursePrice/getcourseprices"),
  courseslist:()=>requests.get("Course/getcourses"),
  courses:(id)=> requests.get(`Course/getcourse/${id}`),
  paymentDetail:()=> requests.get(`PaymentType/getpaymenttypes`),

}

const HomePage={
  list:() => requests.get("HomePageCards/gethomepagecards")
}




const agent = {
  Facilities,
  Account,
  SpecialCourse,
  Prices,
  HomePage
};

export default agent;

