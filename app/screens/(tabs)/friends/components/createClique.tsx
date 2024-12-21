import { View, Text } from "react-native";
import React from "react";
import firestore from "@react-native-firebase/firestore";
import { useRouter } from "expo-router";

const createClique = async (
  groupName: string,
  group: string[],
  router: any,
  uid: string
) => {
  if (!groupName.trim()) {
    throw new Error("Group name cannot be empty.");
  }

  if (group.length === 0) {
    throw new Error("Group must have at least one member.");
  }
  try {
    const userscliquedb = firestore().collection("users").doc(uid);
    const groupsdb = userscliquedb.collection("groups").doc(groupName);
    await groupsdb.set({ uid: uid, groupName: groupName });
    const subcollection = groupsdb.collection("members");
    for (let i = 0; i < group.length; i++) {
      const memberName = group[i];
      if (memberName.trim()) {
        await subcollection.doc(memberName).set({ name: memberName });
      }
    }
    console.log("successfully added");
    router.back();
  } catch (error) {
    console.error(error);
    console.error("Problem as occured");
  }
};

export default createClique;
