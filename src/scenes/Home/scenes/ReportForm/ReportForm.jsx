import {
    Box,
    Button,
    Image,
    Group,
    Select,
    Stack,
    Textarea,
    Title,
    FileButton,
    Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IMAGE_MIME_TYPE } from "@mantine/dropzone";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

import { Dropzone } from "./components";
import { useGeolocation } from "./hooks";
import { categoryObj } from "../../../../categories";
import { useUuid } from "../../../../hooks";

export const ReportForm = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/reports`;
        navigate(path);
    };

    const uuid = useUuid();
    const location = useGeolocation();

    const form = useForm({
        initialValues: {
            file: null,
            category: "",
            description: "",
        },

        validate: {
            file: (value) => (value === null ? "Выберите фото" : null),
            category: (value) => (value.length === 0 ? "Выберите категорию проблемы" : null),
        },
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleSetImage = (imageFiles) => {
        const image = imageFiles[0];
        new Compressor(image, {
            quality: 0.8,
            maxHeight: 1920,
            maxWidth: 1080,
            success: (res) => {
                form.setFieldValue("file", res);
            },
        });
    };

    const handleRemoveImage = () => {
        form.setFieldValue("file", null);
    };

    const handleSubmit = async (values) => {
        form.clearErrors();

        console.log("location", location);
        if (!location) {
            form.setErrors({
                location: "Пожалуйста, разрешите доступ к геолокации.",
            });
            return;
        }

        const formData = new FormData();
        const issue = JSON.stringify({
            categoryId: categoryObj[values.category],
            description: values.description,
            location,
        });

        formData.append("file", values.file);
        formData.append("issue", issue);

        setIsLoading(true);
        // @ts-ignore
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v0/issues/`, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "X-User-UUID": uuid,
            },
            body: formData,
        });

        if (res.ok) routeChange();
        else
            form.setErrors({
                "server-side": `Произошла ошибка (${res.status}${
                    res.statusText ? ` ${res.statusText}` : ""
                })`,
            });
        setIsLoading(false);
    };

    return (
        <Box maw={600} mx="auto" mb="xl" pb="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Title mb="sm" order={2}>
                    Создание обращения
                </Title>
                {form.values.file === null ? (
                    <Dropzone mx="auto" onDrop={handleSetImage} error={form.errors["file"]} />
                ) : (
                    <Stack>
                        <Box style={{ borderRadius: "1rem" }}>
                            <Image
                                mah="40vh"
                                fit="contain"
                                src={URL.createObjectURL(form.values.file)}
                            />
                        </Box>
                        <Group justify="center">
                            <FileButton
                                onChange={(imageFile) => handleSetImage([imageFile])}
                                // @ts-ignore
                                accept={IMAGE_MIME_TYPE}
                            >
                                {(props) => <Button {...props}>Выбрать другое фото</Button>}
                            </FileButton>
                            <Button variant="outline" color="pink" onClick={handleRemoveImage}>
                                Удалить
                            </Button>
                        </Group>
                    </Stack>
                )}
                <Box maw={340} mt="md" mx="auto">
                    <Stack>
                        <Select
                            withAsterisk
                            label="Категория"
                            description="Здесь вы можете выбрать категорию проблемы"
                            placeholder="Мусор"
                            data={Object.keys(categoryObj)}
                            {...form.getInputProps("category")}
                        />
                        <Textarea
                            label="Описание проблемы"
                            description="Здесь вы можете описать проблему"
                            placeholder="У моего дома не убирают мусор"
                            {...form.getInputProps("description")}
                        />
                    </Stack>

                    <Group justify="center" mt="md">
                        {["server-side", "location"].map((errorKey) => (
                            <Text
                                key={errorKey}
                                c="var(--mantine-color-error)"
                                fz="sm"
                                style={{ textIndent: 0 }}
                            >
                                {form.errors[errorKey]}
                            </Text>
                        ))}
                        <Button type="submit" loading={isLoading} fullWidth>
                            Отправить
                        </Button>
                    </Group>
                </Box>
            </form>
        </Box>
    );
};
