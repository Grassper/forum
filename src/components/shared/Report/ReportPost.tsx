import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  postId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportPost: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  postId,
}) => {
  const [value, setValue] = React.useState("");

  const currentUser = React.useContext(UserContext).user;

  const HandlerPostSubmit = () => {
    if (currentUser.id && postId && value) {
      const input: reportPostFetch_ = {
        content: value,
        reporterId: currentUser.id,
        postId: postId,
      };
      reportPostFetch(input);
    }

    setReportModal(false);
  };
  return (
    <Modal isOpen={reportModal} mt={12} onClose={() => setReportModal(false)}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Post</Modal.Header>
        <Modal.Body>
          <Radio.Group
            accessibilityLabel="report post"
            name="report"
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
            value={value}
          >
            <Radio colorScheme="warning" my={1} value="Sexual content">
              Sexual content
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="Violent or repulsive content"
            >
              Violent or repulsive content
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="Hateful or abusive content"
            >
              Hateful or abusive content
            </Radio>
            <Radio colorScheme="warning" my={1} value="Harassment or bullying">
              Harassment or bullying
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="Harmful or dangerous acts"
            >
              Harmful or dangerous acts
            </Radio>
            <Radio colorScheme="warning" my={1} value="Child abuse">
              Child abuse
            </Radio>
            <Radio colorScheme="warning" my={1} value="Promotes terrorism">
              Promotes terrorism
            </Radio>
            <Radio colorScheme="warning" my={1} value="Spam or misleading">
              Spam or misleading
            </Radio>
            <Radio colorScheme="warning" my={1} value="Infringes my rights">
              Infringes my rights
            </Radio>
            <Radio colorScheme="warning" my={1} value="Captions issue">
              Captions issue
            </Radio>
          </Radio.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              colorScheme="blueGray"
              onPress={() => {
                setReportModal(false);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              bg="rose.600"
              onPress={HandlerPostSubmit}
              variant="unstyled"
            >
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

interface reportPostFetch_ {
  content: string;
  reporterId: string;
  postId: string;
}
const reportPostFetch = async (input: reportPostFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportPostRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportUserRelation_>;

    if (reportUserData.data?.createReportPost) {
      return reportUserData.data.createReportPost.id;
    }
  } catch (err) {
    console.error(
      "Error occured while report by user in the post report screen",
      err
    );
  }
};

interface CreateReportUserRelation_ {
  createReportPost?: { id: string };
}

const CreateReportPostRelation = /* GraphQL */ `
  mutation CreateReportPost($input: CreateReportPostInput!) {
    createReportPost(input: $input) {
      id
    }
  }
`;
