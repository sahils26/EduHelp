const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { email, firstName,lastName, message, phoneNo, countrycode } = req.body
  console.log("reqBody",req.body)
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstName, lastName, message, phoneNo, countrycode)
    )

    const dataToSelf= {
      email: email,
      firstName :firstName,
      lastName : lastName,
      message:message,
      phoneNo:phoneNo,
      countrycode:countrycode
    }

    console.log("dataToSelf",dataToSelf);

    const emailToSelf = await mailSender(
      process.env.MAIL_USER,
      "USER CONTACT US DATA",
      `<p>UserEmail : ${email}</p> 
       <p>First Name : ${firstName}</p>
       <p>Last Name : ${lastName}</p>
       <p>Message : ${message}</p>
       <p>Phone No : ${phoneNo}</p>
       <p>Country Code : ${countrycode}</p>`
    )

    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
