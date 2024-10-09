import React, { useRef } from "react";
import { Button, Group, Stack, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone as MantineDropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export const Dropzone = ({ onDrop, error, ...rest }) => {
    const openRef = useRef(null);
    return (
        <>
            <MantineDropzone
                openRef={openRef}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={10 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                activateOnClick={false}
                onDrop={onDrop}
                style={{ ...(error && { borderColor: "var(--mantine-color-error)" }) }}
                {...rest}
            >
                <Stack
                    justify="center"
                    align="center"
                    gap="xl"
                    mih={220}
                    style={{ pointerEvents: "none" }}
                >
                    <MantineDropzone.Accept>
                        <IconUpload
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-blue-6)",
                            }}
                            stroke={1.5}
                        />
                    </MantineDropzone.Accept>
                    <MantineDropzone.Reject>
                        <IconX
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-red-6)",
                            }}
                            stroke={1.5}
                        />
                    </MantineDropzone.Reject>
                    <MantineDropzone.Idle>
                        <IconPhoto
                            style={{
                                width: rem(52),
                                height: rem(52),
                                color: "var(--mantine-color-dimmed)",
                            }}
                            stroke={1.5}
                        />
                    </MantineDropzone.Idle>

                    <Stack align="center" gap={0}>
                        <Text size="xl">Перетащите фотографию сюда</Text>
                        <Text size="sm" c="dimmed">
                            или нажмите на кнопку
                        </Text>
                        <Group mt="md">
                            <Button
                                onClick={() => openRef.current?.()}
                                style={{ pointerEvents: "all" }}
                            >
                                Выбрать фото
                            </Button>
                        </Group>
                    </Stack>
                </Stack>
            </MantineDropzone>
            {error && (
                <Text component="span" c="var(--mantine-color-error)" fz="sm">
                    {error}
                </Text>
            )}
        </>
    );
};
