import { arrayUnion, query, where } from "firebase/firestore";
import { Collections } from "../../utils/Collections";
import { Fields } from "../../utils/Fields";
import {
  addDocument,
  getDocuments,
  setCollection,
  updateDocument,
} from "../../utils/FirebaseUtils";
import Rating from "../../Modals/DB/Rating";

export default async function defaultFn() {}

export async function readColleagues(employeeId, employerId) {
  try {
    let employees = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.employees),
        where(Fields.currentEmployerId, "==", employerId),
        where(Fields.isActive, "==", true)
      )
    );
    querySnapshot.forEach(async (doc) => {
      if (doc.id !== employeeId) {
        let employee = {
          id: doc.id,
          isActive: doc.data().isActive,
          employeeName: doc.data().employeeName,
          lastRatings: doc.data().lastRatings,
          employeeEmail: doc.data().employeeEmail,
          companyLocation: doc.data().companyLocation,
          profileImage: doc.data().profileImage,
          dateOfBirth: doc.data().dateOfBirth,
          role: doc.data().role,
          currentEmployerId: doc.data().currentEmployerId,
          employerIdList: doc.data().employerIdList,
          designation: doc.data().designation,
          salary: doc.data().salary,
          companyName: doc.data().companyName,
          companyLogo: doc.data().companyLogo,
          typeOfEmployment: doc.data().typeOfEmployment,
          offerLetter: doc.data().offerLetter,
          dateOfJoining: doc.data().dateOfJoining,
          employeeAadhaarCardNumber: doc.data().employeeAadhaarCardNumber,
          portfolioLink: doc.data().portfolioLink,
          resume: doc.data().resume,
          skills: doc.data().skills,
        };
        employees.push(employee);
      }
    });
    return employees;
  } catch (error) {
    console.log(error);
  }
}

export async function getRequests(employeeEmail) {
  try {
    let requests = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.requests),
        where(Fields.employeeEmail, "==", employeeEmail),
        where(Fields.isActive, "==", true),
        where(Fields.isApproved, "==", false)
      )
    );
    querySnapshot.forEach((doc) => {
      const request = {
        id: doc.id,
        isActive: doc.data().isActive,
        isApproved: doc.data().isApproved,
        companyName: doc.data().companyName,
        companyLogo: doc.data().companyLogo,
        employerEmail: doc.data().employerEmail,
        employerId: doc.data().employerId,
        employeeEmail: doc.data().employeeEmail,
        employeeId: doc.data().employeeId,
        offerId: doc.data().offerId,
      };
      requests.push(request);
    });
    return requests;
  } catch (error) {
    console.log(error);
  }
}
export async function readOffers(employeeEmail) {
  try {
    let offers = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.offers),
        where(Fields.employeeEmail, "==", employeeEmail),
        where(Fields.isActive, "==", true)
      )
    );
    querySnapshot.forEach(async (doc) => {
      let offer = {
        id: doc.id,
        isActive: doc.data().isActive,
        isAccepted: doc.data().isAccepted,
        companyName: doc.data().companyName,
        companyLogo: doc.data().companyLogo,
        employerEmail: doc.data().employerEmail,
        employerId: doc.data().employerId,
        employeeEmail: doc.data().employeeEmail,
        companyLocation: doc.data().companyLocation,
        dateOfJoining: doc.data().dateOfJoining,
        typeOfEmployment: doc.data().typeOfEmployment,
        designation: doc.data().designation,
        salary: doc.data().salary,
        offerLetter: doc.data().offerLetter,
      };
      offers.push(offer);
    });
    return offers;
  } catch (error) {
    console.log(error);
  }
}
export async function rejectRequest(requestId) {
  await updateDocument(
    Collections.requests,
    { isActive: false, emailAvailable: true },
    requestId
  );
}
export async function acceptRequest(employeeId, requestId) {
  await updateDocument(
    Collections.requests,
    { isApproved: true, emailAvailable: true, employeeId: employeeId },
    requestId
  );
}

export async function profileUpdate(profileData, employeeId) {
  await updateDocument(Collections.employees, profileData, employeeId);
}
export async function offerAccept(profileData, employeeId, offerId) {
  await updateDocument(
    Collections.offers,
    {
      isAccepted: true,
      isActive: false,
      employeeId: employeeId,
      employeeName: profileData.employeeName,
    },
    offerId
  );
  await updateDocument(Collections.employees, profileData, employeeId);
  await updateDocument(
    Collections.employees,
    {
      employerIdList: arrayUnion({
        employerId: profileData.currentEmployerId,
        companyName: profileData.companyName,
        companyLogo: profileData.companyLogo,
        dateOfJoining: profileData.dateOfJoining,
      }),
    },
    employeeId
  );
}
export async function readEmployeeRatings(employeeId) {
  try {
    let ratings = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.ratings),
        where(Fields.employeeId, "==", employeeId)
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

export async function readAssessment(employeeId) {
  try {
    let assessmentQuestions = [];
    const querySnapshot = await getDocuments(
      query(
        setCollection(Collections.assessments),
        where(Fields.employeeId, "==", employeeId),
        where(Fields.isActive, "==", true),
        where(Fields.isAnswered, "==", false)
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
        ratedAtDate: new Date().toDateString(),
        ratedByEmail: doc.data().ratedByEmail,
        employeeId: doc.data().employeeId,
        employeeName: doc.data().employeeName,
        employeeEmail: doc.data().employeeEmail,
        title: doc.data().title,
        description: doc.data().description,
        questionsList: doc.data().questionsList,
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

export async function submitAssessment(answersList, questionId) {
  await updateDocument(
    Collections.assessments,
    {
      answers: answersList,
      isAnswered: true,
    },
    questionId
  );
}

export async function rateCollegue(ratingData) {
  let rating = new Rating();
  rating = {
    isActive: true,
    companyName: ratingData.companyName,
    ratedById: ratingData.ratedById,
    ratedByRole: ratingData.ratedByRole,
    ratedAt: new Date(),
    ratedAtDate: new Date().toDateString(),
    ratedByEmail: ratingData.ratedByEmail,
    employeeId: ratingData.employeeId,
    employeeName: ratingData.employeeName,
    employeeEmail: ratingData.employeeEmail,
    dateOfReview: ratingData.dateOfReview,
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
  await updateDocument(
    Collections.employees,
    {
      lastRatings: arrayUnion({
        ratedById: ratingData.ratedById,
        ratedAtDate: new Date().toLocaleDateString(),
      }),
    },
    ratingData.employeeId
  );
  return await addDocument(Collections.ratings, rating);
}

// //READS
// export async function readTasksByTeammate(teammateId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.teammateId, "==", teammateId),
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
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           profileImage: doc.data().profileImage,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           taskId: doc.data().taskId,
//           totalHours: doc.data().totalHours,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
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
// export async function readArchivedTasksByTeammate(teammateId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.teammateId, "==", teammateId),
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
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           profileImage: doc.data().profileImage,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           taskId: doc.data().taskId,
//           totalHours: doc.data().totalHours,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
//           type: doc.data().type,
//           communications: communications,
//         };
//         tasks.push(task);
//       });
//       promises.push(promise);
//     });
//     await Promise.all(promises);
//     sessionStorage.setItem("archiveTasks", JSON.stringify(tasks));
//     //sessionStorage.setItem("tasks", tasks);
//     return tasks;
//   } catch (err) {
//     return [];
//   }
// }
// export async function readApprovedTasksByTeammate(teammateId) {
//   try {
//     const tasks = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.tasks),
//         where(Fields.teammateId, "==", teammateId),
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
//           clientName: doc.data().clientName,
//           corrections: doc.data().corrections,
//           createdAt: doc.data().createdAt,
//           profileImage: doc.data().profileImage,
//           createdBy: doc.data().createdBy,
//           createdByEmail: doc.data().createdByEmail,
//           deadline: doc.data().deadline,
//           isLive: doc.data().isLive,
//           managerId: doc.data().managerId,
//           status: doc.data().status,
//           taskId: doc.data().taskId,
//           totalHours: doc.data().totalHours,
//           teammateId: doc.data().teammateId,
//           teammateName: doc.data().teammateName,
//           title: doc.data().title,
//           type: doc.data().type,
//           communications: communications,
//         };
//         tasks.push(task);
//       });
//       promises.push(promise);
//     });
//     await Promise.all(promises);
//     sessionStorage.setItem("archiveTasks", JSON.stringify(tasks));
//     //sessionStorage.setItem("tasks", tasks);
//     return tasks;
//   } catch (err) {
//     return [];
//   }
// }
// export async function readCommunications(doc) {
//   try {
//     const communications = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setSubCollection(Collections.tasks, doc.id, Collections.communications),
//         where(Fields.isVisible, "==", true)
//       )
//     );
//     querySnapshot.forEach(async (doc) => {
//       let communication = new Communication();
//       communication = {
//         id: doc.id,
//         corrections: doc.data().corrections,
//         correctionNo: doc.data().correctionNo,
//         createdAt: doc.data().createdAt,
//         createdBy: doc.data().createdBy,
//         createdByEmail: doc.data().createdByEmail,
//         isVisible: doc.data().isVisible,
//         managerId: doc.data().managerId,
//         teammateId: doc.data().teammateId,
//         query: doc.data().query,
//         queryId: doc.data().queryId,
//         description: doc.data().description,
//         type: doc.data().type,
//       };
//       switch (doc.data().type) {
//         case "DESCRIPTION_ADDED":
//           communication.description = doc.data().description;
//           break;
//         case "QUERY_ADDED":
//           communication.query = doc.data().query;
//           communication.queryNo = doc.data().queryNo;
//           break;
//         case "QUERY_REPLIED":
//           communication.query = doc.data().query;
//           communication.queryId = doc.data().queryId;
//           communication.queryReplied = doc.data().queryReplied;
//           break;
//         case "CORRECTION_ADDED":
//           communication.description = doc.data().description;
//           break;
//         default:
//           break;
//       }
//       communications.push(communication);
//     });
//     return communications;
//   } catch (err) {
//     return [];
//   }
// }

// export async function readNotifications(teammateId) {
//   try {
//     const notifications = [];
//     const query1 = query(
//       setCollection(Collections.notifications),
//       where(Fields.teammateId, "==", teammateId),
//       where(Fields.isActive, "==", true)
//     );

//     // const query2 = query((query1),
//     //   where(Fields.createdBy, "!=", teammateId),
//     // );

//     const querySnapshot = await getDocuments(query1);

//     querySnapshot.forEach(async (doc) => {
//       if (doc.data().createdBy !== teammateId) {
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

// export async function profileUpdate(profileData) {
//   const resumeFileUrl = await uploadFile(
//     Fields.resumes,
//     profileData.name,
//     profileData.resume
//   );
//   await updateDocument(
//     Collections.employees,
//     {
//       //   skills: arrayUnion(profileData.skills),
//       resume: resumeFileUrl,
//     },
//     teammateId
//   );
//   return await addDocument(Collections.offers, offer);
// }
// export async function readRequestsTeammate(teammateEmail) {
//   try {
//     const requests = [];
//     const querySnapshot = await getDocuments(
//       query(
//         setCollection(Collections.requests),
//         where(Fields.teammateEmail, "==", teammateEmail),
//         where(Fields.isActive, "==", true)
//       )
//     );
//     querySnapshot.forEach((doc) => {
//       const request = {
//         id: doc.id,
//         createdAt: doc.data().createdAt,
//         createdBy: doc.data().createdBy,
//         managerId: doc.data().managerId,
//         teammateEmail: doc.data().teammateEmail,
//         managerName: doc.data().managerName,
//         companyName: doc.data().companyName,
//         companyId: doc.data().companyId,
//         isActive: doc.data().isActive,
//       };
//       requests.push(request);
//     });
//     return requests;
//   } catch (err) {
//     return [];
//   }
// }
// export async function requestAcceptTeammate(
//   teammateEmail,
//   name,
//   managerId,
//   teammateId,
//   companyId,
//   companyName,
//   managerName,
//   requestId
// ) {
//   await updateDocument(
//     Collections.teammates,
//     {
//       managerId: arrayUnion(managerId),
//       companyId: companyId,
//       companyName: companyName,
//       currentManagerId: managerId,
//       currentManagerName: managerName,
//     },
//     teammateId
//   );
//   await updateDocument(
//     Collections.requests,
//     {
//       isActive: false,
//     },
//     requestId
//   );
//   addNotification({
//     createdAt: new Date(),
//     createdBy: teammateId,
//     createdByEmail: teammateEmail,
//     managerId: managerId,
//     teammateId: teammateId,
//     title: name,
//     type: Notifications.REQUEST_ACCEPTED,
//   });
// }

// export async function requestRejectTeammate(
//   teammateEmail,
//   name,
//   managerId,
//   teammateId,
//   requestId
// ) {
//   await updateDocument(
//     Collections.requests,
//     {
//       isActive: false,
//     },
//     requestId
//   );
//   addNotification({
//     createdAt: new Date(),
//     createdBy: teammateId,
//     createdByEmail: teammateEmail,
//     managerId: managerId,
//     teammateId: teammateId,
//     title: name,
//     type: Notifications.REQUEST_REJECTED,
//   });
// }

// export async function markTeammateAttendance(
//   companyId,
//   teammateId,
//   managerId,
//   teammateName,
//   companyName,
//   date,
//   timeStamp
// ) {
//   var attendance = new Attendance();
//   attendance = {
//     companyId: companyId,
//     teammateId: teammateId,
//     managerId: managerId,
//     teammateName: teammateName,
//     companyName: companyName,
//     attendanceMarkedDate: date,
//     attendanceMarked: timeStamp,
//     isApproved: false,
//   };
//   await addDocument(Collections.attendance, attendance);
//   await updateDocument(
//     Collections.teammates,
//     { attendanceMarkedDate: date },
//     teammateId
//   );
// }

// const diff_hours = (dt2, dt1) => {
//   var diff =
//     (new Date("" + dt2).getTime() - new Date("" + dt1).getTime()) / 1000;
//   diff /= 60 * 60;
//   return Math.abs(diff);
// };

// export async function playTask(task_id, teammateId) {
//   var today = new Date();
//   await pauseTask(teammateId);
//   const q = setDocument(Collections.tasks, task_id);
//   const docSnap = await getDocument(q);
//   if (docSnap.exists()) {
//     let now = 0;
//     if (docSnap.data()?.totalPauseHours !== undefined) {
//       now = docSnap.data()?.totalPauseHours;
//     }
//     if (docSnap.data()?.pauseTimeStamp !== null) {
//       now += diff_hours(
//         today,
//         new Date(docSnap.data()?.pauseTimeStamp?.seconds * 1000)
//       );
//     }
//     await updateDocument(
//       Collections.tasks,
//       {
//         totalPauseHours: now,
//         status: Fields.ON_GOING,
//         startTimeStamp: today,
//         pauseTimeStamp: null,
//       },
//       task_id
//     );
//   }
// }

// export async function assignTask(task_id) {
//   await updateDocument(
//     Collections.tasks,
//     {
//       status: Fields.ASSIGNED,
//       startTimeStamp: null,
//     },
//     task_id
//   );
// }

// export async function pauseTask(teammateId) {
//   var today = new Date();
//   const q = query(
//     setCollection(Collections.tasks),
//     where(Fields.status, "==", Fields.ON_GOING),
//     where(Fields.isLive, "==", true),
//     where(Fields.teammateId, "==", teammateId)
//   );
//   const querySnapshot = await getDocuments(q);
//   querySnapshot.forEach((docA) => {
//     let now = 0;
//     if (docA.data().totalHours !== undefined) {
//       now = docA.data().totalHours;
//     }
//     if (docA.data()?.startTimeStamp !== null) {
//       now += diff_hours(
//         today,
//         new Date(docA.data()?.startTimeStamp?.seconds * 1000)
//       );
//     }
//     updateDocument(
//       Collections.tasks,
//       {
//         status: Fields.PAUSED,
//         totalHours: now,
//         startTimeStamp: null,
//         pauseTimeStamp: new Date(),
//       },
//       docA.id
//     );
//   });
// }

// export async function markTaskDone(task, task_id) {
//   var today = new Date();
//   const q = setDocument(Collections.tasks, task_id);
//   const docSnap = await getDocument(q);
//   if (docSnap.exists()) {
//     let now = 0;
//     let pauseTime = 0;
//     if (docSnap.data().totalHours !== undefined) {
//       now = docSnap.data().totalHours;
//     }
//     if (docSnap.data().startTimeStamp !== null) {
//       now += diff_hours(
//         today,
//         new Date(docSnap.data().startTimeStamp.seconds * 1000)
//       );
//     }
//     if (docSnap.data().totalPauseHours !== undefined) {
//       pauseTime = docSnap.data().totalPauseHours;
//     }
//     if (docSnap.data().pauseTimeStamp !== null) {
//       pauseTime += diff_hours(
//         today,
//         new Date(docSnap.data().pauseTimeStamp.seconds * 1000)
//       );
//     }
//     updateDocument(
//       Collections.tasks,
//       {
//         status: Fields.DONE,
//         totalHours: now,
//         completedOn: today,
//         startTimeStamp: null,
//         pauseTimeStamp: null,
//         totalPauseHours: pauseTime,
//       },
//       docSnap.id
//     );
//   }
//   addNotification({
//     createdAt: task.createdAt,
//     createdBy: task.createdBy,
//     createdByEmail: task.createdByEmail,
//     managerId: task.managerId,
//     teammateId: task.teammateId,
//     title: task.title,
//     type: Notifications.DONE_TASK,
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

// export async function clearNotifications(teammateId) {
//   var today = new Date();
//   const q = query(
//     setCollection(Collections.notifications),
//     where(Fields.teammateId, "==", teammateId),
//     where(Fields.createdBy, "!=", teammateId),
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

// export async function countAllTasks(teammateId) {
//   const tasksRef = query(
//     setCollection(Collections.tasks),
//     where(Fields.teammateId, "==", teammateId)
//   );
//   const snapshot = await getDocuments(tasksRef);
//   const count = snapshot.size;
//   return count;
// }

// export async function countTotalHours(teammateId) {
//   const tasksRef = query(
//     setCollection(Collections.tasks),
//     where(Fields.teammateId, "==", teammateId)
//   );
//   const snapshot = await getDocuments(tasksRef);
//   let totalHours = 0;
//   snapshot.forEach((doc) => {
//     totalHours += doc.data().totalHours;
//   });
//   return totalHours;
// }

// export async function countCurrentTasks(teammateId) {
//   const tasksRef = query(
//     setCollection(Collections.tasks),
//     where(Fields.isLive, "==", true),
//     where(Fields.teammateId, "==", teammateId)
//   );
//   const snapshot = await getDocuments(tasksRef);
//   const count = snapshot.size;
//   return count;
// }

// export async function updateteammateDetails(teammateId, userDetails) {
//   try {
//     let photoUrl;
//     if (userDetails.photoFile) {
//       photoUrl = await uploadPhoto(teammateId, userDetails.photoFile);
//     }
//     const q = setDocument(Collections.teammates, teammateId);
//     const docSnap = await getDocument(q);
//     if (docSnap.exists()) {
//       const updateData = {
//         teammateName:
//           userDetails.teammateName || userDetails.name === ""
//             ? docSnap.data()?.teammateName
//             : userDetails.name,
//         whatsappNumber:
//           userDetails.whatsappNumber === ""
//             ? docSnap.data()?.whatsappNumber
//             : userDetails.whatsappNumber,
//         profileImage: photoUrl === "" ? docSnap.data()?.profileImage : photoUrl,
//       };
//       await updateDocument(Collections.teammates, updateData, docSnap.id);
//       return photoUrl;
//     } else {
//       throw new Error("Teammate does not exist");
//     }
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error updating teammate details");
//   }
// }
