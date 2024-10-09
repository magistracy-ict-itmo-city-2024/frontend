import React from "react";
import { Container, Title, Text, Button, Image, Stack } from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";

import { ReportForm } from "./scenes/ReportForm";
import gorod from "../../../src/assets/gorod24-background.webp";
import classes from "./Home.module.css";
import { Logo } from "../../components/Logo";

export const Home = () => {
    const { scrollIntoView, targetRef } = useScrollIntoView({
        offset: 60,
    });
    return (
        <Container fluid p={0}>
            <Container fluid p={0}>
                <Container className={classes.lending} fluid pt={0} pr={0}>
                    <Stack justify="center" px="md">
                        <Title ta="center" order={1}>
                            Что предоставляет сервис <Logo inherit={true} />?
                        </Title>
                        <Text ta="justify">
                            Наш веб-сайт превращает процесс создания и отправки обращений в
                            муниципальные службы города в простое заполнение формы прямо на сайте.
                        </Text>
                        <Text mb="xl" ta="justify">
                            Вы можете отравить обращение насчет проблем со стоком дождевой воды,
                            формирования опасных сосулек на зданиях, открытых люках, мусоре на
                            дорогах и других проблемах.
                        </Text>

                        <Button
                            onClick={() =>
                                scrollIntoView({
                                    alignment: "start",
                                })
                            }
                        >
                            Создать обращение
                        </Button>
                    </Stack>

                    <Container pr={0} visibleFrom="sm">
                        <Image src={gorod} className={classes.background} />
                    </Container>
                </Container>
            </Container>
            <Container
                // @ts-ignore
                ref={targetRef}
                m={0}
                mt="6rem"
                mx="auto"
            >
                <ReportForm />
            </Container>
        </Container>
    );
};
