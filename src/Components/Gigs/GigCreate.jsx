import React, { useEffect, useState } from 'react';
import { Text, Input, VStack, Button, HStack, Textarea, Stack, Checkbox } from '@chakra-ui/react';
import { useForm, Controller, useFieldArray } from "react-hook-form"
import Select from "react-select"
import CreatableSelect from 'react-select/creatable'; // Import the CreatableSelect component
import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createGig } from '../../helpers/freelancerApis';


export const GigCreate = ({ activeStep, setActiveStep }) => {
    return <GigOverview activeStep={activeStep} setActiveStep={setActiveStep} />
}

export const GigOverview = ({ activeStep, setActiveStep }) => {
    const [preview, setPreview] = useState();

    const schema = yup.object().shape({
        title: yup.string().required('Title is required'),
        // Define validation rules for other fields if needed
    });

    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            category: {},
            skills: [], // Assuming skills are objects with 'label' property
            pricing: {
                custom_title: '',
                custom_description: '',
                delivery_days: 0,
                revisions: 0,
                service_options: [],
            },
            images: null,
            video: null,
            requirements: [],
            steps: [],
            project_description: {
                project_summary: "",
                faqs: [],
            },
            terms: false,
            privacy_notice: false,
        },

        resolver: yupResolver(schema),
    })

    const handleUploadedFile = (event) => {
        const file = event.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        console.log('Dropped file:', file);
    };

    const { fields: requirementFields, append: appendRequirement } = useFieldArray({
        control,
        name: 'requirements',
    });

    const { fields: stepFields, append: appendStep } = useFieldArray({
        control,
        name: 'steps',
    });

    const { fields: faqFields, append: appendFaq } = useFieldArray({
        control,
        name: 'faqs',
    });

    const { fields: termFields, append: appendTerm } = useFieldArray({
        control,
        name: 'terms',
    });

    const { fields: privacyFields, append: appendPrivacy } = useFieldArray({
        control,
        name: 'privacyNotices',
    });

    const addRequirement = () => {
        // Add a new requirement object to the array
        appendRequirement({ requirement: '', required: false });
    };

    const addStep = () => {
        // Add a new step object to the array
        appendStep({ step_title: '', description: '' });
    };

    const handleClick = () => {
        document.getElementById('fileInput').click();
    };

    const addFaq = () => {
        appendFaq({ question: '', answer: '' });
    };

    const addTerm = () => {
        appendTerm({ checked: false, text: '' });
    };

    const addPrivacyNotice = () => {
        appendPrivacy({ checked: false, text: '' });
    };


    const onSubmit = async (data) => {
        // Transform data to the desired format
        const transformedData = {
            title: data.title,
            category: data.category.category_id,
            skills: data.skills.map(skill => skill.label), // Assuming skills are objects with 'label' property
            pricing: {
                custom_title: data.pricing.custom_title,
                custom_description: data.pricing.custom_description,
                delivery_days: parseInt(data.pricing.delivery_days),
                revisions: parseInt(data.pricing.revisions),
                service_options: data.pricing.service_options,
            },
            images: data.images || [],
            video: data.video || "",
            requirements: data.requirements || [],
            steps: data.steps || [],
            project_description: {
                project_summary: data.project_description.project_summary,
                faqs: data.project_description.faqs
            },
            terms: data.terms,
            privacy_notice: data.privacy_notice,
        };
        console.log(transformedData);
        const response = await createGig(transformedData);
        console.log(response);
    };

    return <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] pb-10'>
        {
            activeStep === 0 && <GigCreateLayout title={"Gig Overview"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>Title</label>
                    <p>Tell client what you are going to deliver and how it'll benifites them.</p>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <Input
                                    {...field}
                                    placeholder="You will get a fantastic deliverable that drives impact"
                                    marginTop="5px"
                                />
                                {fieldState.error && (
                                    <p style={{ color: 'red', marginTop: '5px' }}>{fieldState.error.message}</p>
                                )}
                            </>
                        )}
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
                                    { _id: 1, category_id: "6586ac7bf89033570689394f", label: "Chocolate" },
                                    { _id: 1, category_id: "6586ac7bf89033570689394f", label: "Strawberry" },
                                    { _id: 1, category_id: "6586ac7bf89033570689394f", label: "Vanilla" },
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
                    <label htmlFor="" className='text-2xl font-[600] pb-0'>
                        Create pricing tiers
                    </label>
                    <br />
                    <label htmlFor="" className='text-xl font-[600] pb-0'>
                        Custom Title
                    </label>
                    <Controller
                        name="pricing.custom_title"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder='Web Application' marginTop={"5px"} />}
                    />
                    <p className="text-right w-full">0/30 characters</p>
                </VStack>

                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>
                        Custom Description
                    </label>
                    <Controller
                        name="pricing.custom_description"
                        control={control}
                        render={({ field }) => <Textarea {...field} placeholder='Web Application' marginTop={"5px"} />}
                    />
                    <p className="text-right w-full">0/80 characters</p>
                </VStack>

                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>
                        Delivery Days
                    </label>
                    <Controller
                        name="pricing.delivery_days"
                        control={control}
                        render={({ field }) => <Input type="number" {...field} marginTop={"5px"} placeholder='3' width={"50%"} />}
                    />
                </HStack>

                <HStack alignItems={"center"} justifyContent={"space-between"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>
                        Number Of Revisions
                    </label>
                    <Controller
                        name="pricing.revisions"
                        control={control}
                        render={({ field }) => (
                            <select {...field} className='w-[50%] py-2 px-3 border'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        )}
                    />
                </HStack>

                {/* Checkbox for each service option */}
                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="" className='text-2xl font-[600] pb-0 mb-4'>
                        Services Options
                    </label>
                    <Checkbox
                        colorScheme='green'
                        size='lg'
                        onChange={(e) => {
                            setValue("pricing.service_options.design_customization", e.target.checked);
                        }}
                    >
                        Design Customization
                    </Checkbox>
                    <Checkbox
                        colorScheme='green'
                        size='lg'
                        onChange={(e) => {
                            setValue("pricing.service_options.content_upload", e.target.checked);
                        }}
                    >
                        Content Upload
                    </Checkbox>
                    <Checkbox
                        colorScheme='green'
                        size='lg'
                        onChange={(e) => {
                            setValue("pricing.service_options.responsive_design", e.target.checked);
                        }}
                    >
                        Responsive Design
                    </Checkbox>
                    <Checkbox
                        colorScheme='green'
                        size='lg'
                        onChange={(e) => {
                            setValue("pricing.service_options.source_code", e.target.checked);
                        }}
                    >
                        Source Code
                    </Checkbox>
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
                            <IoImageOutline size={"1.6rem"} />
                        </label>
                        <Text>
                            Drag image here or <br /> <strong>browse</strong>
                        </Text>
                        <Input
                            id="fileInput"
                            type="file"
                            name="profilePicture"
                            onChange={handleUploadedFile}
                            style={{ display: 'none' }}
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
                            <IoVideocamOutline size={"1.6rem"} />
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
            activeStep === 3 &&
            <GigCreateLayout title={"Gig Requirement & Steps"}>
                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>
                        Information you need from the client before you start your project
                    </label>

                    <VStack backgroundColor={"var(--secondarycolor)"} width={"100%"}
                        padding={"1rem 1.5rem"}
                        marginTop={"1rem"}>
                        {requirementFields.map((requirement, index) => (
                            <VStack
                                key={index}
                                alignItems={"start"}
                                width={"100%"}
                                marginBottom={"0.8rem"}
                            >
                                <label htmlFor="" className="font-semibold mb-0 pb-0">Requirement</label>
                                <VStack alignItems={"start"} width={"100%"}>
                                    <Controller
                                        name={`requirements[${index}].requirement`}  // Use index to create unique names
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />
                                                <HStack width={"100%"}>
                                                    <Checkbox
                                                        colorScheme='green'
                                                        size='lg'
                                                        {...field}
                                                        onChange={(e) => {
                                                            // Update the checkbox value using the index
                                                            setValue(`requirements[${index}].required`, e.target.checked);
                                                        }}
                                                    ></Checkbox>
                                                    <Text fontSize={"1rem"}>Client needs to answer before I can start working</Text>
                                                </HStack>
                                            </>
                                        )}
                                    />
                                </VStack>
                            </VStack>
                        ))}
                    </VStack>
                    <HStack width={"100%"}>
                        <Button
                            color='#16a34a'
                            fontWeight={"600"}
                            cursor={'pointer'}
                            padding={"1rem 0"}
                            backgroundColor={"transparent"}
                            _hover={{
                                backgroundColor: 'transparent'
                            }}
                            onClick={() => addRequirement()}
                        >
                            <FiPlus size={'1.3rem'} /> <Text>Add a requirement</Text>
                        </Button>
                    </HStack>
                </VStack>


                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>
                        Steps you'll take to get the project done
                    </label>
                    <VStack backgroundColor={"var(--secondarycolor)"}
                        padding={"2rem 1.5rem"}
                        marginTop={"1rem"}
                        width={"100%"}
                    >
                        {stepFields.map((step, index) => (
                            <VStack
                                key={index}
                                alignItems={"start"}
                                width={"100%"}
                                className="shadow-md rounded-md py-3"
                            >
                                <label htmlFor="" className="font-semibold">Step {index + 1} title</label>

                                <Controller
                                    name={`steps[${index}].step_title`}  // Unique name using index
                                    control={control}
                                    render={({ field }) => <Input {...field} placeholder='Enter step title' marginTop={"5px"} />}
                                />
                                <br />
                                <label htmlFor="" className="font-semibold">Description (Optional)</label>
                                <Controller
                                    name={`steps[${index}].description`}  // Unique name using index
                                    control={control}
                                    render={({ field }) => <Textarea {...field} placeholder='Enter step description' marginTop={"5px"} />}
                                />
                            </VStack>
                        ))}
                    </VStack>
                    <HStack width={"100%"}>
                        <Button
                            color='#16a34a'
                            fontWeight={"600"}
                            cursor={'pointer'}
                            padding={"1rem 0"}
                            backgroundColor={"transparent"}
                            onClick={() => addStep()}
                            _hover={{
                                backgroundColor: 'transparent'
                            }}
                        >
                            <FiPlus size={'1.3rem'} /> <Text>Add a step</Text>
                        </Button>
                    </HStack>
                </VStack>
            </GigCreateLayout>
            ||
            activeStep === 4 && <GigCreateLayout title={"Project description"}>
                <VStack alignItems={"start"}>
                    <label htmlFor="" className='text-xl font-[600] pb-0'>
                        Project Summary
                    </label>
                    <p>Tell the client what you are going to deliver and how it'll benefit them.</p>
                    <Controller
                        name="project_description.project_summary"
                        control={control}
                        render={({ field }) => (
                            <Textarea {...field} placeholder='You will get a fantastic deliverable that drives impact' marginTop={"5px"} />
                        )}
                    />
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>
                        Frequently asked questions (optional)
                    </label>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <VStack width={"100%"}>
                        {faqFields.map((faq, index) => (
                            <VStack
                                key={index}
                                alignItems={"start"}
                                width={"100%"}
                                backgroundColor={"var(--secondarycolor)"}
                                padding={"2rem 1.5rem"}
                                marginTop={"1rem"}
                                className="shadow-md rounded-md"
                            >
                                <label htmlFor="" className="font-semibold">
                                    Question
                                </label>
                                <Controller
                                    name={`project_description.faqs[${index}].question`}
                                    control={control}
                                    render={({ field }) => <Textarea {...field} placeholder='Enter the question' marginTop={"5px"} />}
                                />
                                <label htmlFor="" className="font-semibold">
                                    Answer
                                </label>
                                <Controller
                                    name={`project_description.faqs[${index}].answer`}
                                    control={control}
                                    render={({ field }) => <Textarea {...field} placeholder='Enter the answer' marginTop={"5px"} />}
                                />
                            </VStack>
                        ))}
                    </VStack>
                    <HStack width={"100%"}>
                        <Button
                            color='#16a34a'
                            fontWeight={"600"}
                            cursor={'pointer'}
                            padding={"1rem 0"}
                            backgroundColor={"transparent"}
                            onClick={() => addFaq()}
                            _hover={{
                                backgroundColor: 'transparent'
                            }}
                        >
                            <FiPlus size={'1.3rem'} /> <Text>Add a step</Text>
                        </Button>
                    </HStack>
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>
                        Terms of Service
                    </label>
                    <HStack width={"100%"}>
                        <Checkbox
                            colorScheme='green'
                            size='lg'
                            onChange={(e) => {
                                setValue("terms", e.target.checked);
                            }}
                        ></Checkbox>
                        <Text fontSize={"0.9rem"}>
                            I understand and agree to the <strong>Bizzzy Terms of Service</strong>, including the{' '}
                            <strong>User Agreement</strong> and <strong>Privacy Policy</strong>
                        </Text>
                    </HStack>
                </VStack>

                <VStack alignItems={"start"} width={"100%"}>
                    <label htmlFor="fileInput" className='text-[1.7rem] font-[600] pb-0 mb-0'>
                        Privacy Notice
                    </label>
                    <HStack width={"100%"}>
                        <Checkbox
                            colorScheme='green'
                            size='lg'
                            onChange={(e) => {
                                setValue("privacy_notice", e.target.checked);
                            }}
                        ></Checkbox>
                        <Text fontSize={"0.9rem"}>
                            By submitting the project and activating it, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae,
                            labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, deleniti.
                        </Text>
                    </HStack>
                </VStack>
            </GigCreateLayout>

        }

        <HStack marginTop={"1rem"}>
            <Button className="mt-3 border" backgroundColor={"white"} height={"34px"} fontWeight={"400"} borderRadius={"25px"} border={"2px solid  var(--primarytextcolor)"} transition={"0.3s ease-in-out"} _hover={{
                color: "white",
                backgroundColor: "var(--primarytextcolor)"
            }} onClick={() => setActiveStep(activeStep !== 0 ? activeStep - 1 : activeStep)}>Back</Button>

            <Button className="mt-3 border" backgroundColor={"var(--primarytextcolor)"} color={"white"} height={"34px"} fontWeight={"400"} borderRadius={"25px"} border={"2px solid  var(--primarytextcolor)"} display={activeStep !== 4 ? 'block' : 'none'} transition={"0.3s ease-in-out"} _hover={{
                color: "black",
                backgroundColor: "white"
            }} onClick={() => setActiveStep(activeStep !== 4 ? activeStep + 1 : activeStep)}>Save & Continue</Button>


            <Button className="mt-3 border" backgroundColor={"var(--primarytextcolor)"} color={"white"} height={"34px"} fontWeight={"400"} borderRadius={"25px"} border={"2px solid  var(--primarytextcolor)"} transition={"0.3s ease-in-out"} display={activeStep === 4 ? 'block' : 'none'} _hover={{
                color: "black",
                backgroundColor: "white"
            }} type='submit'>Submit now</Button>

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

