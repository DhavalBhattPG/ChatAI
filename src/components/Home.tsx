import { Button, Checkbox } from "antd";
import { Col, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const systemMessage = {
  role: "system",
  content:
    "Explain things like you're talking to a software professional with 10 years of experience.",
};

const options = [
  { label: "Positive case", value: "Positivecase" },
  { label: "Negative case", value: "Negativecase" },
  { label: "Boundry value case", value: "Boundryvaluecase" },
  { label: "Browser copatibility case", value: "Browsercopatibilitycase" },
  { label: "Security case", value: "Security case" },
];

function Home() {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [replyFromGPT, setReplyFromGPT] = useState("");
  const [newMessageForProcess, setNewMessageForProcess] = useState("");

  const handleSend = async (message: string) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: any) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      console.log({ role: role, content: messageObject.message });
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setReplyFromGPT(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
      });
  }

  return (
    <>
      <Row>
        <Col span={12}>Enter or paste test case</Col>
        <Col span={12}>
          <Button> Reset </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TextArea
            rows={4}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setNewMessageForProcess(event.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Checkbox.Group options={options} defaultValue={["Apple"]} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              handleSend(newMessageForProcess);
            }}
          >
            {" "}
            Generate Case{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TextArea rows={8} value={replyFromGPT} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button> Download PDF </Button>
        </Col>
      </Row>
    </>
  );
}

export default Home;
