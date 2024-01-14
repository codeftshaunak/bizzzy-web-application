import React, { useEffect, useState } from 'react';
import { Text, Input, VStack, Button, HStack, Textarea, Stack, Checkbox } from '@chakra-ui/react';
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"
import CreatableSelect from 'react-select/creatable'; // Import the CreatableSelect component
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";


export const GigCreate = ({ activeStep, setActiveStep }) => {
    return <GigOverview activeStep={activeStep} setActiveStep={setActiveStep} />
}


export const GigOverview = ({ activeStep, setActiveStep }) => {
    const [preview, setPreview] = useState();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            category: {},
        },
    })

    const handleUploadedFile = (event) => {
        const file = event.target.files[0];


        const urlImage = URL.createObjectURL(file);


        setPreview(urlImage);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        // Handle the dropped file as needed
        console.log('Dropped file:', file);
    };

    const handleClick = () => {
        // Trigger the click on the file input when the box is clicked
        document.getElementById('fileInput').click();
    };

    const onSubmit = (data) => console.log(data)

    return <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] pb-10'>
        {
            activeStep === 0 && <GigCreateLayout title={"Gig Overview"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Title</label>
                    <p>Tell client what you are going to deliver and how it'll benifites them.</p>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => <Input {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                    />
                </VStack>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Category</label>
                    <p>Select a category that will easy for other to find your gig.</p>
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className='w-full'
                                {...field}
                                options={[
                                    { _id: "1245454", label: "Chocolate" },
                                    { _id: "123444424", label: "Strawberry" },
                                    { _id: "12344242", label: "Vanilla" },
                                ]}
                            />
                        )}
                    />
                </VStack>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Skills</label>
                    <p>Add skills relevant to your gig.</p>
                    <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                            <>
                                <CreatableSelect
                                    className='w-full'
                                    isMulti
                                    {...field}
                                    options={[
                                        { value: "html", label: "HTML" },
                                        { value: "css", label: "CSS" },
                                        { value: "javascript", label: "JavaScript" },
                                        // Add more skills as needed
                                    ]}
                                />
                            </>
                        )}
                    />
                </VStack>
            </GigCreateLayout>
            ||
            activeStep === 1 && <GigCreateLayout title={"Gig Price & Scope"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-2xl font-[600] pb-0'>Create pricing tiers</label>
                    <br />
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Custom Title</label>
                    <Controller
                        name="custom_title"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder='Web Application' marginTop={"5px"} />}
                    />
                    <p className="text-right w-full">0/30 characters</p>
                </VStack>

                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Custom Description</label>
                    <Controller
                        name="custom_description"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder='Web Application' marginTop={"5px"} />}
                    />
                    <p className="text-right w-full">0/80 characters</p>
                </VStack>

                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Delivery Days</label>
                    <Controller
                        name="delivery_days"
                        control={control}
                        render={({ field }) => <Input type="number" {...field} marginTop={"5px"} placeholder='3' width={"50%"} />}
                    />
                </HStack>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Number Of Revisions</label>
                    <Controller
                        name="revisions"
                        control={control}
                        render={({ field }) => (
                            <Select
                                className='w-[50%]'
                                {...field}
                                options={[
                                    { _id: "1", label: "1" },
                                    { _id: "2", label: "2" },
                                    { _id: "3", label: "3" },
                                ]}
                            />
                        )} />
                </HStack>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Number Of Pages</label>
                    <Controller
                        name="pages"
                        control={control}
                        render={({ field }) => <Input type="number" {...field} marginTop={"5px"} placeholder='3' width={"50%"} />}
                    />
                </HStack>
                <br />
                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="" className='text-2xl font-[600] pb-0 mb-4'>Services Options</label>
                    <Stack spacing={2} direction='row' display={"flex"} flexDirection={"column"} width={"52%"}>
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <Text fontSize={"1rem"} fontWeight={"600"}>Design Customization</Text>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                        </HStack>
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <Text fontSize={"1rem"} fontWeight={"600"}>Content Upload</Text>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                        </HStack>
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <Text fontSize={"1rem"} fontWeight={"600"}>Responsive Design</Text>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                        </HStack>
                        <HStack justifyContent={"space-between"} width={"100%"}>
                            <Text fontSize={"1rem"} fontWeight={"600"}>Source Code</Text>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                        </HStack>
                    </Stack>
                </VStack>
            </GigCreateLayout>
            ||
            activeStep === 2 && <GigCreateLayout title={"Create a Gig Gallery"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="fileInput" className='text-xl font-[600] pb-0 mb-0'>Project Images</label>
                    <p className='mt-0 mb-2'>Upload up to 5 images (.jpg or .png), less than 10MB.</p>
                    <VStack textAlign={"center"} backgroundColor={"var(--secondarycolor)"} padding={"2rem 2rem"} className='shadow-lg rounded-lg cursor-pointer' onDrop={handleDrop}
                        onClick={handleClick}
                        onDragOver={(e) => e.preventDefault()}>
                        <label htmlFor="fileInput">
                            <IoVideocamOutline size={"1.6rem"} />
                        </label>
                        <Text>
                            Drag image here or <br /> <strong>browse</strong>
                        </Text>
                        <Input
                            id="fileInput"
                            type="file"
                            name="profilePicture"
                            onChange={handleUploadedFile}
                            style={{ display: 'none' }} // Hide the actual input
                        />
                    </VStack>
                </VStack>

                <VStack alignItems={"start"}>
                    <label htmlFor="fileInput" className='text-xl font-[600] pb-0 mb-0'>Project Videos</label>
                    <p className='mt-0 mb-2'>Upload one video (.mp4), up to 10MB.</p>
                    <VStack textAlign={"center"} backgroundColor={"var(--secondarycolor)"} padding={"2rem 2rem"} className='shadow-lg rounded-lg cursor-pointer' onDrop={handleDrop}
                        onClick={handleClick}
                        onDragOver={(e) => e.preventDefault()}>
                        <label htmlFor="fileInput">
                            <IoImageOutline size={"1.6rem"} />
                        </label>
                        <Text>
                            Drag video here or <br /> <strong>browse</strong>
                        </Text>
                        <Input
                            id="fileInput"
                            type="file"
                            name="profilePicture"
                            onChange={handleUploadedFile}
                            style={{ display: 'none' }} // Hide the actual input
                        />
                    </VStack>
                </VStack>
            </GigCreateLayout>
            ||
            activeStep === 3 && <GigCreateLayout title={"Gig Requirement & Steps"}>
                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>Information you need from client before you start your project</label>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque facilis veritatis temporibus nemo deserunt sint, aut exercitationem dolores officiis ratione, aliquid unde.</p>
                    <VStack alignItems={"start"} width={"100%"} backgroundColor={"var(--secondarycolor)"} padding={"2rem 1.5rem"} marginTop={"1rem"} className="shadow-md rounded-md">
                        <label htmlFor="" className="font-semibold">Requirement</label>
                        <Controller
                            name="requirement"
                            control={control}
                            render={({ field }) => <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                        />
                        <HStack width={"100%"}>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                            <Text fontSize={"1rem"}>Client needs to answer before I can start working</Text>
                        </HStack>
                    </VStack>
                    <HStack color='#16a34a' fontWeight={"600"} cursor={'pointer'} padding={"1rem 0"}>
                        <FiPlus size={'1.3rem'} /> <Text>Add a requirement</Text>
                    </HStack>
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>Steps you'll take to get the project done</label>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque facilis veritatis temporibus nemo deserunt.</p>
                    <VStack alignItems={"start"} width={"100%"} backgroundColor={"var(--secondarycolor)"} padding={"2rem 1.5rem"} marginTop={"1rem"} className="shadow-md rounded-md">
                        <label htmlFor="" className="font-semibold">Step 1 title</label>
                        <Controller
                            name="requirement"
                            control={control}
                            render={({ field }) => <Input {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                        />
                        <br />
                        <label htmlFor="" className="font-semibold">Description (Optional)</label>
                        <Controller
                            name="requirement"
                            control={control}
                            render={({ field }) => <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                        />

                    </VStack>
                    <HStack color='#16a34a' fontWeight={"600"} cursor={'pointer'} padding={"1rem 0"}>
                        <FiPlus size={'1.3rem'} /> <Text>Add a step</Text>
                    </HStack>
                </VStack>
            </GigCreateLayout>
            ||
            activeStep === 4 && <GigCreateLayout title={"Project description"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Project Summary</label>
                    <p>Tell client what you are going to deliver and how it'll benifites them.</p>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                    />
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>Frequently asked questions (optionals)</label>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    {/* <VStack alignItems={"start"} width={"100%"} backgroundColor={"var(--secondarycolor)"} padding={"2rem 1.5rem"} marginTop={"1rem"} className="shadow-md rounded-md">
                        <label htmlFor="" className="font-semibold">Requirement</label>
                        <Controller
                            name="requirement"
                            control={control}
                            render={({ field }) => <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />}
                        />
                        <HStack width={"100%"}>
                            <Checkbox colorScheme='green' size='lg'></Checkbox>
                            <Text fontSize={"1rem"}>Client needs to answer before I can start working</Text>
                        </HStack>
                    </VStack> */}
                    <HStack color='#16a34a' fontWeight={"600"} cursor={'pointer'} padding={"1rem 0"}>
                        <FiPlus size={'1.3rem'} /> <Text>Add a question</Text>
                    </HStack>
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>Terms of Service</label>
                    <HStack width={"100%"}>
                        <Checkbox colorScheme='green' size='lg'></Checkbox>
                        <Text fontSize={"0.9rem"}>I understand and agree to the <strong>Upwork Terms of Service</strong>, including the <strong>User Agreement</strong> and <strong>Privicy Policy</strong></Text>
                    </HStack>
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>Privicy Notice</label>
                    <HStack width={"100%"}>
                        <Checkbox colorScheme='green' size='lg'></Checkbox>
                        <Text fontSize={"0.9rem"}>By submitting the project and activing it, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti.</Text>
                    </HStack>
                </VStack>

            </GigCreateLayout>
        }



        <HStack marginTop={"1rem"}>
            <Button className="mt-3 border" backgroundColor={"white"} height={"34px"} fontWeight={"400"} borderRadius={"25px"} border={"2px solid  var(--primarytextcolor)"} transition={"0.3s ease-in-out"} _hover={{
                color: "white",
                backgroundColor: "var(--primarytextcolor)"
            }} onClick={() => setActiveStep(activeStep !== 0 ? activeStep - 1 : activeStep)}>Back</Button>
            <Button className="mt-3 border" backgroundColor={"var(--primarytextcolor)"} color={"white"} height={"34px"} fontWeight={"400"} borderRadius={"25px"} border={"2px solid  var(--primarytextcolor)"} transition={"0.3s ease-in-out"} _hover={{
                color: "black",
                backgroundColor: "white"
            }} onClick={() => setActiveStep(activeStep !== 4 ? activeStep + 1 : activeStep)}>Save & Continue</Button>
        </HStack>
    </form>
}


export const GigCreateLayout = ({ children, title }) => {
    return <div className='w-[60%]'>
        <Text fontSize={"2.5rem"} fontWeight={"600"} textAlign={"left"}>{title}</Text>
        <br />
        <div className='w-full flex flex-col gap-5'>
            {children}
        </div>
    </div>
}

