export default class UserInfo {
  constructor(userData) {
    this.profileName = document.querySelector("name");
    this.profileJob = document.querySelector("job");
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };

    //Have a public method named getUserInfo(), which returns an
    //object containing information about the user. This method will
    //be handy for cases when it's necessary to display the user data
    //in the open form.
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;

    //Have a public method named setUserInfo(), which takes new user
    //data and adds it to the page. This method should be used after
    //successful submission of the profile form.
  }
}

//Create an instance of the UserInfo class in index.js and use its methods as described.
