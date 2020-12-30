import * as d3 from "d3";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
  Heading,
  List,
  Text,
  TextInput,
} from "grommet";
import * as Icons from "grommet-icons";
import React, { useState } from "react";
import { actionOverview } from "../redux/action/overview-actions";
import { useThunkDispatch } from "../redux/action/root-action";
import { useRootSelector } from "../redux/state/root-state";

const SearchBox: React.FC = () => {
  const [currentKeyword, setCurrentKeyword] = useState("");
  const keywords = useRootSelector((state) => state.overview.keywords);
  const seedPapers = useRootSelector((state) => state.overview.seedPapers);
  const dispatch = useThunkDispatch();

  return (
    <Card height="100%" width="100%" background="white">
      <CardHeader pad="small">
        <Heading level="4">Search Box</Heading>
      </CardHeader>
      <CardBody pad="small" gap="small">
        <Box direction="row" align="baseline" gap="small">
          <Heading level="5">Keywords</Heading>
          <Button
            color="blue"
            onClick={() => {
              dispatch(actionOverview.setKeywords([]));
            }}
          >
            clear
          </Button>
        </Box>
        <Form
          onSubmit={() => {
            if (!keywords.includes(currentKeyword.toLocaleLowerCase())) {
              dispatch(actionOverview.setKeywords([...keywords, currentKeyword]));
            }
            setCurrentKeyword("");
          }}
        >
          <TextInput
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
          />
          <List
            data={keywords.map((keyword) => ({ entry: keyword }))}
            primaryKey={(item) => item.entry}
            pad={{ left: "small", right: "none", top: "none", bottom: "none" }}
          >
            {(item: any, i: number) => (
              <Box
                key={item.doi}
                direction="row-responsive"
                gap="medium"
                align="center"
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: d3.schemeTableau10[Math.min(i, 9)],
                  }}
                />
                <Text size="small">{item.entry}</Text>
                <Button
                  icon={<Icons.Close size="small" />}
                  hoverIndicator
                  onClick={() => {
                    dispatch(
                      actionOverview.setKeywords(
                        keywords.filter((k) => k !== item.entry)
                      )
                    );
                  }}
                />
              </Box>
            )}
          </List>
        </Form>
        <Box direction="row" align="baseline" gap="small">
          <Heading level="5">Seed papers</Heading>
          <Button
            color="blue"
            onClick={() => {
              dispatch(actionOverview.setSeedPapers([]));
            }}
          >
            clear
          </Button>
        </Box>
        <Form onSubmit={() => {}}>
          <List
            data={seedPapers.map((entry) => entry)}
            primaryKey={(entry) => entry.title}
            pad={{ left: "small", right: "none", top: "none", bottom: "none" }}
          >
            {(item: any, i: number) => (
              <Box
                key={item.doi}
                direction="row-responsive"
                gap="medium"
                align="center"
              >
                <div
                  style={{
                    width: 20,
                    minWidth: 20,
                    height: 20,
                    backgroundColor: d3.schemePurples[9].slice(3)[Math.min(i, 6)],
                  }}
                />
                <Text size="small">{item.title}</Text>
                <Button
                  icon={<Icons.Close size="small" />}
                  hoverIndicator
                  onClick={() => {
                    dispatch(
                      actionOverview.setSeedPapers(
                        seedPapers.filter((e) => e !== item)
                      )
                    );
                  }}
                />
              </Box>
            )}
          </List>
        </Form>
      </CardBody>
      <CardFooter
        pad={{ horizontal: "small" }}
        background="light-1"
        justify="end"
      >
        <Button
          onClick={() => {}}
          icon={<Icons.Search color="plain" />}
          hoverIndicator
        />
      </CardFooter>
    </Card>
  );
};

export default SearchBox;
