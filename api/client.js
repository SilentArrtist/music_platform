import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "ewl3r917",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
    token: 'skDjDBpnrGu8pN4kJmX5b1il1NtWO3PGq3EnSdHroCRCfCMkJKZXz4dgYaueE7ubfwJrkjibIHLIDi8HUscps69Gz7WeAkZU272mY9QxOsBk82j8zyEW8qcuxWAAvwHoTGHubIiIoT1yMPFZCkIGt9vJGNy81kAwKIIv8DL6nGTGIrddmj3e',
});
