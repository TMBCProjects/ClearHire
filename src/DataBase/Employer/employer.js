import Rating from "../../Modals/DB/Rating";
import Offer from "../../Modals/DB/Offer";
import { Collections } from "../../utils/Collections";
import {
  addDocument,
  getDocument,
  getDocuments,
  setDocument,
  updateDocument,
  uploadFile,
} from "../../utils/FirebaseUtils";
import { Fields } from "../../utils/Fields";
import { setCollection } from "../../utils/FirebaseUtils";
import { arrayUnion, query, where } from "firebase/firestore";
import Request from "../../Modals/DB/Request";
import Assessment from "../../Modals/DB/Assessment";
import sendEmail from "../../utils/Email";

export default async function defaultFn() {}

// //READS
// export async function readTasksByManager(managerId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.managerId, "==", managerId),
//         where(Fields.isLive, "==", true)
//       )
//     );
//     const promises = [];
//     querySnapshot.forEach((doc) => {
//       const promise = readCommunications(doc).then((communications) => {
//         const task = {
//           id: doc.id,
//           assigned: doc.data().assigned,
//           companyName: doc.data().companyName,
//           companyId: doc.data().companyId,
//           clientId: doc.data().clientId,
//           clientEmail: doc.data().clientEmail,
//           profileImage: doc.data().profileImage,
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           pauseTimeStamp:doc.data()?.pauseTimeStamp,
//           startTimeStamp:doc.data()?.startTimeStamp,
//           completedOn:doc.data().completedOn,
//           taskId: doc.data().taskId,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
//           totalHours: doc.data().totalHours,
//           highPriority: doc.data().highPriority,
//           type: doc.data().type,
//           communications: communications,
//         };
//         tasks.push(task);
//       });
//       promises.push(promise);
//     });
//     await Promise.all(promises);

//     sessionStorage.setItem("tasks", JSON.stringify(tasks));
//     //sessionStorage.setItem("tasks", tasks);
//     return tasks;
//   } catch (err) {
//     return [];
//   }
// }

// export async function readApprovedTasksByManager(managerId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.managerId, "==", managerId),
//         where(Fields.status, "==", Fields.APPROVED),
//         where(Fields.isLive, "==", false)
//       )
//     );
//     const promises = [];
//     querySnapshot.forEach((doc) => {
//       const promise = readCommunications(doc).then((communications) => {
//         const task = {
//           id: doc.id,
//           assigned: doc.data().assigned,
//           companyName: doc.data().companyName,
//           companyId: doc.data().companyId,
//           clientId: doc.data().clientId,
//           clientEmail: doc.data().clientEmail,
//           profileImage: doc.data().profileImage,
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           pauseTimeStamp: doc.data()?.pauseTimeStamp,
//           startTimeStamp: doc.data()?.startTimeStamp,
//           completedOn: doc.data()?.completedOn,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           taskId: doc.data().taskId,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
//           totalHours: doc.data().totalHours,
//           highPriority: doc.data().highPriority,
//           type: doc.data().type,
//           communications: communications,
//         };
//         tasks.push(task);
//       });
//       promises.push(promise);
//     });
//     await Promise.all(promises);
//     return tasks;
//   } catch (err) {
//     return [];
//   }
// }
// export async function readArchivedTasksByManager(managerId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.managerId, "==", managerId),
//         where(Fields.status, "==", Fields.ARCHIVED),
//         where(Fields.isLive, "==", false)
//       )
//     );
//     const promises = [];
//     querySnapshot.forEach((doc) => {
//       const promise = readCommunications(doc).then((communications) => {
//         const task = {
//           id: doc.id,
//           assigned: doc.data().assigned,
//           companyName: doc.data().companyName,
//           companyId: doc.data().companyId,
//           clientId: doc.data().clientId,
//           clientEmail: doc.data().clientEmail,
//           profileImage: doc.data().profileImage,
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           taskId: doc.data().taskId,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
//           totalHours: doc.data().totalHours,
//           highPriority: doc.data().highPriority,
//           type: doc.data().type,
//           communications: communications,
//         };
//         tasks.push(task);
//       });
//       promises.push(promise);
//     });
//     await Promise.all(promises);
//     return tasks;
//   } catch (err) {
//     return [];
//   }
// }

// export async function readTeammatesByMangerId(id) {
//   let teamates = [];
//   const teammatesRef = setCollection(Collections.teammates);
//   const q = query(teammatesRef, where(Fields.currentManagerId, "==", id));
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((doc) => {
//     let teamate = {
//       id: doc.id,
//       data: doc.data(),
//     };
//     teamates.push(teamate);
//   });
//   return teamates;
// }

// export async function readClientsByMangerId(id) {
//   let clients = [];
//   const clientsRef = setCollection(Collections.clients);
//   const q = query(clientsRef, where(Fields.managerId, "==", id));
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((doc) => {
//     let client = {
//       id: doc.id,
//       data: doc.data(),
//     };
//     clients.push(client);
//   });
//   return clients;
// }

// export async function readTypesByMangerId(id) {
//   let types = [];
//   const typesRef = setCollection(Collections.types);
//   const q = query(typesRef, where(Fields.managerId, "==", id));
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((doc) => {
//     let type = {
//       id: doc.id,
//       data: doc.data(),
//     };
//     types.push(type);
//   });
//   return types;
// }
// function convertStringToDate(dateString, timeString) {
//   const dateParts = dateString.split("/");
//   const timeParts = timeString.split(":");
//   const year = parseInt(dateParts[2]);
//   const month = parseInt(dateParts[1]) - 1;
//   const day = parseInt(dateParts[0]);
//   const hours = parseInt(timeParts[0]);
//   const minutes = parseInt(timeParts[1]);
//   const seconds = parseInt(timeParts[2]);
//   return new Date(year, month, day, hours, minutes, seconds);
// }

// fetch the employer details
;
export async function readUnemployed() {
  try {
    let employees = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.employees),
        where(Fields.currentEmployerId, "==", ""),
        where(Fields.isActive, "==", true)
      )
    );
    const promises = [];
    querySnapshot.forEach(async (doc) => {
      const promise = readEmployeeRatings(doc.id).then((ratings) => {
        let employee = {
          id: doc.id,
          isActive: doc.data().isActive,
          lastRatings: doc.data().lastRatings,
          ratings: ratings,
          employeeName: doc.data().employeeName,
          employeeEmail: doc.data().employeeEmail,
          profileImage: doc.data().profileImage,
          dateOfBirth: doc.data().dateOfBirth,
          role: doc.data().role,
          currentEmployerId: doc.data().currentEmployerId,
          employerIdList: doc.data().employerIdList,
          designation: doc.data().designation,
          salary: doc.data().salary,
          companyName: doc.data().companyName,
          companyLogo: doc.data().companyLogo,
          companyLocation: doc.data().companyLocation,
          typeOfEmployment: doc.data().typeOfEmployment,
          offerLetter: doc.data().offerLetter,
          dateOfJoining: doc.data().dateOfJoining,
          employeeAadhaarCardNumber: doc.data().employeeAadhaarCardNumber,
          portfolioLink: doc.data().portfolioLink,
          resume: doc.data().resume,
          skills: doc.data().skills,
        };
        employees.push(employee);
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    return employees;
  } catch (error) {
    console.log(error);
  }
}
export async function readEmployee(id) {
  try {
    let employee = {};
    const q = setDocument(Collections.employees, id);
    const doc = await getDocument(q);
    if (doc.exists()) {
      const promise = readEmployeeRatings(doc.id).then((ratings) => {
        employee = {
          id: doc.id,
          isActive: doc.data().isActive,
          employeeName: doc.data().employeeName,
          lastRatings: doc.data().lastRatings,
          ratings: ratings,
          employeeEmail: doc.data().employeeEmail,
          profileImage: doc.data().profileImage,
          dateOfBirth: doc.data().dateOfBirth,
          role: doc.data().role,
          currentEmployerId: doc.data().currentEmployerId,
          employerIdList: doc.data().employerIdList,
          designation: doc.data().designation,
          salary: doc.data().salary,
          companyName: doc.data().companyName,
          companyLogo: doc.data().companyLogo,
          companyLocation: doc.data().companyLocation,
          typeOfEmployment: doc.data().typeOfEmployment,
          offerLetter: doc.data().offerLetter,
          dateOfJoining: doc.data().dateOfJoining,
          employeeAadhaarCardNumber: doc.data().employeeAadhaarCardNumber,
          portfolioLink: doc.data().portfolioLink,
          resume: doc.data().resume,
          skills: doc.data().skills,
        };
      });
      await promise;
    }
    return employee;
  } catch (error) {
    console.error("Error while fetching data", error);
    return {};
  }
}
export async function readEmployees(employerId) {
  try {
    let employees = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.employees),
        where(Fields.currentEmployerId, "==", employerId),
        where(Fields.isActive, "==", true)
      )
    );
    const promises = [];
    querySnapshot.forEach(async (doc) => {
      const promise = readEmployeeRatings(doc.id).then((ratings) => {
        let employee = {
          id: doc.id,
          isActive: doc.data().isActive,
          lastRatings: doc.data().lastRatings,
          ratings: ratings,
          employeeName: doc.data().employeeName,
          employeeEmail: doc.data().employeeEmail,
          profileImage: doc.data().profileImage,
          dateOfBirth: doc.data().dateOfBirth,
          role: doc.data().role,
          currentEmployerId: doc.data().currentEmployerId,
          employerIdList: doc.data().employerIdList,
          designation: doc.data().designation,
          salary: doc.data().salary,
          companyName: doc.data().companyName,
          companyLogo: doc.data().companyLogo,
          companyLocation: doc.data().companyLocation,
          typeOfEmployment: doc.data().typeOfEmployment,
          offerLetter: doc.data().offerLetter,
          dateOfJoining: doc.data().dateOfJoining,
          employeeAadhaarCardNumber: doc.data().employeeAadhaarCardNumber,
          portfolioLink: doc.data().portfolioLink,
          resume: doc.data().resume,
          skills: doc.data().skills,
        };
        employees.push(employee);
      });
      promises.push(promise);
    });
    await Promise.all(promises);
    return employees;
  } catch (error) {
    console.log(error);
  }
}
export async function readEmployeeRatings(employeeId) {
  try {
    let ratings = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.ratings),
        where(Fields.employeeId, "==", employeeId),
        where(Fields.isActive, "==", true)
      )
    );
    querySnapshot.forEach(async (doc) => {
      let rating = {
        id: doc.id,
        isActive: doc.data().isActive,
        companyName: doc.data().companyName,
        ratedById: doc.data().ratedById,
        ratedByEmail: doc.data().ratedByEmail,
        ratedByRole: doc.data().ratedByRole,
        ratedAt: doc.data().ratedAt,
        ratedAtDate: doc.data().ratedAtDate,
        employeeId: doc.data().employeeId,
        employeeName: doc.data().employeeName,
        employeeEmail: doc.data().employeeEmail,
        communication: doc.data().communication,
        attitude: doc.data().attitude,
        abilityToLearn: doc.data().abilityToLearn,
        punctuality: doc.data().punctuality,
        commitment: doc.data().commitment,
        trustworthiness: doc.data().trustworthiness,
        skill: doc.data().skill,
        teamPlayer: doc.data().teamPlayer,
        note: doc.data().note,
      };
      ratings.push(rating);
    });
    return ratings;
  } catch (error) {
    console.log(error);
  }
}

// export async function readOfferReplies(employerId) {
//   try {
//     let offers = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.offers),
//         where(Fields.employerId, "==", employerId),
//         where(Fields.isActive, "==", true),
//         where(Fields.isAccepted, "==", false)
//       )
//     );
//     querySnapshot.forEach(async (doc) => {
//       let offer = {
//         id: doc.id,
//         isActive: doc.data().isActive,
//         isAccepted: doc.data().isAccepted,
//         companyName: doc.data().companyName,
//         companyLogo: doc.data().companyLogo,
//         employerEmail: doc.data().employerEmail,
//         employerId: doc.data().employerId,
//         employeeId: doc.data().employeeId,
//         employeeEmail: doc.data().employeeEmail,
//         employeeName: doc.data().employeeName,
//         companyLocation: doc.data().companyLocation,
//         dateOfJoining: doc.data().dateOfJoining,
//         typeOfEmployment: doc.data().typeOfEmployment,
//         designation: doc.data().designation,
//         salary: doc.data().salary,
//         offerLetter: doc.data().offerLetter,
//       };
//       offers.push(offer);
//     });
//     return offers;
//   } catch (error) {
//     console.log(error);
//   }
// }
export async function readDesignations(id) {
  let data = [];
  const querySnapshot = await getDocuments(
    query(
      setCollection(Collections.designations),
      where(Fields.isActive, "==", true),
      where(Fields.companyId, "==", id)
    )
  );
  querySnapshot.forEach((doc) => {
    let designation = {
      id: doc.id,
      designation: doc.data().designation,
      companyId: doc.data().companyId,
    };
    data.push(designation);
  });
  return data;
}
export async function writeDesignation(companyId, name) {
  let newRequest = new Request();
  newRequest = {
    isActive: true,
    companyId: companyId,
    designation: name,
  };
  return await addDocument(Collections.designations, newRequest);
}
export async function deleteOffer(offerId) {
  await updateDocument(
    Collections.offers,
    {
      isActive: false,
    },
    offerId
  );
}
// function to onboard new employee
export async function onboardEmployee(offerData) {
  const offerLetterFileUrl = await uploadFile(
    Fields.offerLetters,
    offerData.email,
    offerData.offerLetter
  );
  let offer = new Offer();
  offer = {
    isActive: true,
    isAccepted: false,
    employeeEmail: offerData.email,
    employeeName: offerData.name,
    emailAvailable: offerData.emailAvailable,
    companyLocation: offerData.companyLocation,
    dateOfJoining: new Date(offerData.dateOfJoining),
    employerEmail: offerData.employerEmail,
    employerId: offerData.employerId,
    companyLogo: offerData.companyLogo,
    typeOfEmployment: offerData.typeOfEmployment,
    companyName: offerData.companyName,
    designation: offerData.designation,
    salary: offerData.salary,
    offerLetter: offerLetterFileUrl,
  };
  const subject = "Join Our Company Page on ClearHire";
  const output = `
    <p>Dear ${offerData.name},<br/><br/>
      We invite you to join our company page on ClearHire as an employee. It's a fantastic platform to showcase your professional profile and connect with our network.<br/>
      Create your profile now at <a href="https://clearhire.app">ClearHire</a>. Showcase your skills and experience to enhance your visibility.<br/>
      We look forward to seeing you on ClearHire!<br/><br/>
      Best regards,<br/>
      ${offerData.companyName} team</p>`;
  sendEmail(offerData.email, subject, output);
  return await addDocument(Collections.offers, offer);
}

export async function requestEmployee(offerData) {
  let offer = new Request();
  offer = {
    isActive: true,
    isApproved: false,
    employeeName: offerData.name,
    employeeEmail: offerData.email,
    employerEmail: offerData.employerEmail,
    employerId: offerData.employerId,
    companyLogo: offerData.companyLogo,
    companyName: offerData.companyName,
    designation: offerData.designation,
    salary: offerData.salary,
    offerId: offerData.id,
  };
  return await addDocument(Collections.offers, offer);
}

export async function rateEmployee(ratingData) {
  let rating = new Rating();
  rating = {
    isActive: true,
    companyName: ratingData.companyName,
    ratedById: ratingData.ratedById,
    ratedByRole: ratingData.ratedByRole,
    ratedAt: ratingData.time,
    ratedAtDate: ratingData.time,
    ratedByEmail: ratingData.ratedByEmail,
    employeeId: ratingData.employeeId,
    employeeName: ratingData.employeeName,
    employeeEmail: ratingData.employeeEmail,
    communication: ratingData.communication,
    attitude: ratingData.attitude,
    abilityToLearn: ratingData.abilityToLearn,
    punctuality: ratingData.punctuality,
    commitment: ratingData.commitment,
    trustworthiness: ratingData.trustworthiness,
    skill: ratingData.skill,
    teamPlayer: ratingData.teamPlayer,
    note: ratingData.note,
  };
  const employeeRef = setDocument(Collections.employees, ratingData.employeeId);
  const employeeSnapshot = await getDocument(employeeRef);

  if (employeeSnapshot.exists()) {
    const employeeData = employeeSnapshot.data();
    const ratings = employeeData.lastRatings || [];
    const ratingIndex = ratings.findIndex(
      (rating) => rating.ratedById === ratingData.ratedById
    );
    if (ratingIndex !== -1) {
      ratings[ratingIndex].ratedAtDate = ratingData.time;
      await addDocument(Collections.ratings, rating);
      await updateDocument(
        Collections.employees,
        {
          lastRatings: ratings,
        },
        ratingData.employeeId
      );
    } else {
      await addDocument(Collections.ratings, rating);
      await updateDocument(
        Collections.employees,
        {
          lastRatings: arrayUnion({
            ratedById: ratingData.ratedById,
            ratedAtDate: ratingData.time
          }),
        },
        ratingData.employeeId
      );
    }
  } else {
    throw new Error(
      `Employee document with ID ${ratingData.employeeId} not found`
    );
  }
}
export async function readAssessment(employeeId) {
  try {
    let assessmentQuestions = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.assessments),
        where(Fields.employeeId, "==", employeeId),
        where(Fields.isActive, "==", true),
        where(Fields.isAnswered, "==", true)
      )
    );
    querySnapshot.forEach(async (doc) => {
      let assessment = {
        isActive: doc.data().isActive,
        id: doc.id,
        companyName: doc.data().companyName,
        ratedById: doc.data().ratedById,
        ratedByRole: doc.data().ratedByRole,
        ratedAt: new Date(),
        ratedAtDate: new Date().toLocaleDateString("en-GB"),
        ratedByEmail: doc.data().ratedByEmail,
        employeeId: doc.data().employeeId,
        employeeName: doc.data().employeeName,
        ratings: doc.data().ratings,
        employeeEmail: doc.data().employeeEmail,
        title: doc.data().title,
        description: doc.data().description,
        questionsList: doc.data().questionsList,
        answers: doc.data().answers,
        isAnswered: doc.data().isAnswered,
      };
      assessmentQuestions.push(assessment);
    });
    return assessmentQuestions;
  } catch (error) {
    return [];
    //console.log(error);
  }
}
export async function assessEmployee(assessData) {
  let assessment = new Assessment();
  assessment = {
    isActive: true,
    isAnswered: false,
    companyName: assessData.companyName,
    ratedById: assessData.ratedById,
    ratedByRole: assessData.ratedByRole,
    ratedAt: new Date(),
    ratedAtDate: new Date().toLocaleDateString("en-GB"),
    ratedByEmail: assessData.ratedByEmail,
    employeeId: assessData.employeeId,
    employeeName: assessData.employeeName,
    employeeEmail: assessData.employeeEmail,
    title: assessData.title,
    description: assessData.description,
    questionsList: assessData.questionsList,
  };
  const employeeRef = setDocument(Collections.employees, assessData.employeeId);
  const employeeSnapshot = await getDocument(employeeRef);

  if (employeeSnapshot.exists()) {
    const employeeData = employeeSnapshot.data();
    const ratings = employeeData.lastRatings || [];
    const ratingIndex = ratings.findIndex(
      (rating) => rating.ratedById === assessData.ratedById
    );

    if (ratingIndex !== -1) {
      ratings[ratingIndex].assessmentDate = new Date().toLocaleDateString(
        "en-GB"
      );
      await updateDocument(
        Collections.employees,
        {
          lastRatings: ratings,
        },
        assessData.employeeId
      );
      await addDocument(Collections.assessments, assessment);
    } else {
      await updateDocument(
        Collections.employees,
        {
          lastRatings: arrayUnion({
            ratedById: assessData.ratedById,
            assessmentDate: new Date().toLocaleDateString("en-GB"),
          }),
        },
        assessData.employeeId
      );
    }
  } else {
    throw new Error(
      `Employee document with ID ${assessData.employeeId} not found`
    );
  }
}

export async function rateAssessment(data, assessmentId) {
  await updateDocument(
    Collections.assessments,
    {
      ratings: data,
    },
    assessmentId
  );
}

export async function sendRequestToViewAssesment(data) {
  let newRequest = new Request();
  newRequest = {
    isApproved: false,
    isActive: true,
    companyName: data.companyName,
    companyLogo: data.companyLogo,
    employerEmail: data.employerEmail,
    employeeName: data.employeeName,
    employeeEmail: data.employeeEmail,
    employerId: data.employerId,
    emailAvailable: data.emailAvailable,
  };
  return await addDocument(Collections.requests, newRequest);
}




// export async function switchTask(id, oldTeammate, newTeammate, data) {
//   addNotification({
//     createdAt: newTeammate.createdAt,
//     createdBy: newTeammate.createdBy,
//     createdByEmail: newTeammate.createdByEmail,
//     managerId: newTeammate.managerId,
//     teammateId: newTeammate.teammateId,
//     title: newTeammate.title,
//     type: Notifications.NEW_TASK,
//   });
//   addNotification({
//     createdAt: oldTeammate.createdAt,
//     createdBy: oldTeammate.createdBy,
//     createdByEmail: oldTeammate.createdByEmail,
//     managerId: oldTeammate.managerId,
//     teammateId: oldTeammate.teammateId,
//     title: oldTeammate.title,
//     type: Notifications.ARCHIVED_TASK,
//   });
//   return await updateDocument(Collections.tasks, data, id);
// }

// export async function addDescription(description, id) {
//   return await addSubDocument(
//     Collections.tasks,
//     id,
//     Collections.communications,
//     description
//   );
// }

// export async function requestTeammate(
//   managerId,
//   managerName,
//   companyId,
//   companyName,
//   managerEmail,
//   teammateEmail
// ) {
//   const q = query(
//     setCollection(Collections.teammates),
//     where(Fields.teammateEmail, "==", teammateEmail)
//   );
//   let teammateId = "";
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach(async (docA) => {
//     teammateId = docA.id;
//     let request = new Request();
//     request = {
//       createdAt: new Date(),
//       createdBy: managerId,
//       managerId: managerId,
//       teammateEmail: teammateEmail,
//       managerName: managerName,
//       companyName: companyName,
//       companyId: companyId,
//       isActive: true,
//     };
//     return await addDocument(Collections.requests, request);
//   });
//   addNotification({
//     createdAt: new Date(),
//     createdBy: managerId,
//     createdByEmail: managerEmail,
//     managerId: managerId,
//     teammateId: teammateId,
//     title: managerName,
//     type: Notifications.REQUEST_FROM_MANAGER,
//   });
// }

// export async function addNotification(taskList) {
//   let notification = new Notification();
//   notification = {
//     createdAt: taskList.createdAt,
//     createdBy: taskList.createdBy,
//     createdByEmail: taskList.createdByEmail,
//     managerId: taskList.managerId,
//     teammateId: taskList.teammateId,
//     type: taskList.type,
//     title: taskList.title,
//     isActive: true,
//   };
//   return await addDocument(Collections.notifications, notification);
// }

// export async function readNotifications(managerId) {
//   try {
//     const notifications = [];
//     const query1 = query(
//       setCollection(Collections.notifications),
//       where(Fields.managerId, "==", managerId),
//       where(Fields.isActive, "==", true)
//     );

//     // const query2 = query((query1),
//     //   where(Fields.createdBy, "!=", teammateId),
//     // );

//     const querySnapshot = await getDocuments(query1);

//     querySnapshot.forEach(async (doc) => {
//       if (doc.data().createdBy !== managerId) {
//         let notification = new Notification();
//         notification = {
//           id: doc.id,
//           createdAt: doc.data().createdAt,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           isActive: doc.data().isActive,
//           managerId: doc.data().managerId,
//           teammateId: doc.data().teammateId,
//           title: doc.data().title,
//           type: doc.data().type,
//         };
//         notifications.push(notification);
//       }
//     });
//     return notifications;
//   } catch (err) {
//     return [];
//   }
// }

// export async function clearNotifications(managerId) {
//   var today = new Date();
//   const q = query(
//     setCollection(Collections.notifications),
//     where(Fields.managerId, "==", managerId),
//     where(Fields.createdBy, "!=", managerId),
//     where(Fields.isActive, "==", true)
//   );
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((docA) => {
//     updateDocument(
//       Collections.notifications,
//       {
//         clearedAt: today,
//         isActive: false,
//       },
//       docA.id
//     );
//   });
// }

// export async function clearNotificationWithId(notificationId) {
//   var today = new Date();
//   const q = setDocument(Collections.notifications, notificationId);
//   const docSnap = await getDocument(q);
//   if (docSnap.exists()) {
//     updateDocument(
//       Collections.notifications,
//       {
//         clearedAt: today,
//         isActive: false,
//       },
//       docSnap.id
//     );
//   }
// }

// export async function approveTask(task_id) {
//   var today = new Date();
//   await updateDocument(
//     Collections.tasks,
//     {
//       status: Fields.APPROVED,
//       approvedTimeStamp: today,
//       isLive: false,
//     },
//     task_id
//   );
// }
// export async function updateCorrection(task_id, newCorrection) {
//   await updateDocument(
//     Collections.tasks,
//     {
//       corrections: newCorrection,
//     },
//     task_id
//   );
// }
// export async function updateDue(task_id, newDue) {
//   const due = convertStringToDate(newDue.dateString, newDue.timeString);
//   await updateDocument(
//     Collections.tasks,
//     {
//       deadline: due,
//     },
//     task_id
//   );
// }

// export async function addNewClient(clientData) {
//   let client = new Client();
//   client = {
//     clientName: clientData.clientName,
//     companyId: clientData.companyId,
//     companyName: clientData.companyName,
//     createdAt: clientData.createdAt,
//     createdBy: clientData.createdBy,
//     isActive: true,
//     managerId: clientData.managerId,
//     managerName: clientData.managerName,
//   };

//   return await addDocument(Collections.clients, client);
// }

// export async function addNewType(typeData) {
//   let type = new Type();
//   type = {
//     type: typeData.type,
//     companyId: typeData.companyId,
//     companyName: typeData.companyName,
//     createdAt: typeData.createdAt,
//     createdBy: typeData.createdBy,
//     isActive: true,
//     managerId: typeData.managerId,
//     managerName: typeData.managerName,
//   };

//   return await addDocument(Collections.types, type);
// }
// export async function readTypesByCompanyId(companyId) {
//   let types = [];
//   const clientsRef = setCollection(Collections.types);
//   const q = query(clientsRef, where(Fields.companyId, "==", companyId));
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((doc) => {
//     let client = {
//       id: doc.id,
//       data: doc.data(),
//     };
//     types.push(client);
//   });
//   return types;
// }
// export async function readClientsByCompanyId(companyId) {
//   let clients = [];
//   const clientsRef = setCollection(Collections.clients);
//   const q = query(clientsRef, where(Fields.companyId, "==", companyId));
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((doc) => {
//     let client = {
//       id: doc.id,
//       data: doc.data(),
//     };
//     clients.push(client);
//   });
//   return clients;
// }

// export async function updateManagerDetails(managerId, userDetails) {
//   try {
//     let photoUrl;
//     if (userDetails?.photoFile) {
//       photoUrl = await uploadPhoto(managerId, userDetails.photoFile);
//     }
//     const q = setDocument(Collections.managers, managerId);
//     const docSnap = await getDocument(q);
//     if (docSnap.exists()) {
//       const updateData = {
//         managerName:
//           userDetails.managerName === ""
//             ? docSnap.data()?.managerName
//             : userDetails.name,
//         whatsappNumber:
//           userDetails.whatsappNumber === ""
//             ? docSnap.data()?.whatsappNumber
//             : userDetails.whatsappNumber,
//         profileImage:
//           photoUrl === undefined ? docSnap.data()?.profileImage : photoUrl,
//       };
//       await updateDocument(Collections.managers, updateData, docSnap.id);
//       return photoUrl;
//     } else {
//       throw new Error("Teammate does not exist");
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error updating teammate details");
//   }
// }
