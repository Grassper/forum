import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API } from "aws-amplify";
import { Button, Modal, Radio } from "native-base";
import React from "react";

import { UserContext } from "@/root/src/context";

interface Props_ {
  commentId: string;
  reportModal: boolean;
  setReportModal: (value: boolean) => void;
}

export const ReportComment: React.FC<Props_> = ({
  reportModal,
  setReportModal,
  commentId,
}) => {
  const [value, setValue] = React.useState("");
  const currentUser = React.useContext(UserContext).user;

  const SubmitHandler = () => {
    if (currentUser.id && commentId && value) {
      const input: reportCommentFetch_ = {
        content: value,
        reporterId: currentUser.id,
        commentId: commentId,
      };
      reportCommentFetch(input);
    }

    setReportModal(false);
  };

  return (
    <Modal isOpen={reportModal} mt={12} onClose={() => setReportModal(false)}>
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>Report Comment</Modal.Header>
        <Modal.Body>
          <Radio.Group
            accessibilityLabel="report comment"
            name="report"
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
            value={value}
          >
            <Radio
              colorScheme="warning"
              my={1}
              value="Unwanted commercial content"
            >
              Unwanted commercial content
            </Radio>
            <Radio colorScheme="warning" my={1} value=" spam">
              Spam
            </Radio>
            <Radio colorScheme="warning" my={1} value="Pornography">
              Pornography
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="sexually explicit material"
            >
              sexually explicit material
            </Radio>
            <Radio colorScheme="warning" my={1} value="Child abuse">
              Child abuse
            </Radio>
            <Radio
              colorScheme="warning"
              my={1}
              value="Hate speech or graphic violence"
            >
              Hate speech or graphic violence
            </Radio>
            <Radio colorScheme="warning" my={1} value="Harassment or bullying">
              Harassment or bullying
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
            <Button bg="rose.600" onPress={SubmitHandler} variant="unstyled">
              Submit
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

interface reportCommentFetch_ {
  content: string;
  reporterId: string;
  commentId: string;
}
const reportCommentFetch = async (input: reportCommentFetch_) => {
  try {
    const reportUserData = (await API.graphql({
      query: CreateReportCommentRelation,
      variables: { input },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })) as GraphQLResult<CreateReportCommentRelation_>;

    if (reportUserData.data?.createReportComment) {
      return reportUserData.data.createReportComment.id;
    }
  } catch (err) {
    console.error(
      "Error occured while report by user in the comment report screen",
      err
    );
  }
};

interface CreateReportCommentRelation_ {
  createReportComment?: { id: string };
}

const CreateReportCommentRelation = /* GraphQL */ `
  mutation CreateReportComment($input: CreateReportCommentInput!) {
    createReportComment(input: $input) {
      id
    }
  }
`;
