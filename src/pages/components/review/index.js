/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReviewText from "../../../../utils";
import Head from "next/head";

// Function to fetch reviews
const fetchReviews = async () => {
  const response = await fetch(
    "https://code-shine-technology.vercel.app/reviews"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
};

// Function to validate customerId
const validateCustomerId = async (customerId) => {
  const response = await fetch(
    `https://code-shine-technology.vercel.app/customers/${customerId}`
  );
  const data = await response.json();
  if (!data) {
    throw new Error("Invalid Customer ID");
  }
  return data;
};

// Function to post a review
const postReview = async (reviewData) => {
  const response = await fetch(
    "https://code-shine-technology.vercel.app/reviews",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to post review");
  }
  return response.json();
};

const Review = () => {
  const queryClient = useQueryClient();
  const [customerId, setCustomerId] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [seccess, setSuccess] = useState("");

  // Fetch reviews with React Query v5
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  // Mutation for posting a review
  const { mutate } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      // Invalidate and refetch reviews after a successful mutation
      setSuccess("Your Review Added Successfully");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      setSuccess("");
      alert(`Error submitting review: ${error.message}`);
    },
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the customer ID before posting
      const customerData = await validateCustomerId(customerId);

      // If valid, submit the review
      mutate({ customerId, review: reviewText, customerData });
      setCustomerId("");
      setReviewText("");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Ref to access the carousel
  const carouselRef = useRef(null);

  // Function to scroll the carousel to the left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll the carousel to the right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (error) return <p>Error fetching reviews: {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Reviews | Code Shine Technology</title>
        <meta
          name="description"
          content="Read reviews and testimonials from clients of Code Shine Technology. See what our customers have to say about our web development, design, and digital solutions."
        />
        <meta
          name="keywords"
          content="reviews, testimonials, Code Shine Technology, client feedback, web development reviews"
        />
        <meta property="og:title" content="Reviews | Code Shine Technology" />
        <meta
          property="og:description"
          content="Discover client reviews and testimonials for Code Shine Technology. Learn how our web development and design services have made a difference for our clients."
        />
        <meta
          property="og:image"
          content="https://codeshinetechnology.com/codeshinetechnology.png"
        />
        <meta
          property="og:url"
          content="https://codeshinetechnology.com/components/reviews"
        />
        <meta property="og:site_name" content="Code Shine Technology" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Code Shine Technology" />
      </Head>

      <div className="py-8 px-4 max-w-[1200px] mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center">
          What our client say
        </h2>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="relative w-full">
            {/* Carousel container with buttons */}

            <div
              ref={carouselRef}
              className="carousel carousel-center bg-slate-900 rounded-box w-full space-x-4 p-4 mb-5 overflow-x-auto scrollbar-hide flex items-center"
            >
              {reviews
                ?.slice()
                .reverse()
                .map((review, index) => (
                  <div key={index} className="carousel-item w-full h-auto">
                    <div className="max-w-sm mx-auto p-6 bg-slate-950 shadow shadow-blue-500 rounded-lg hover:shadow-2xl hover:shadow-blue-600 transition-shadow duration-300 ease-in-out">
                      <div className="flex items-center">
                        <img
                          className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md"
                          src={review.customerImage}
                          alt={`Profile picture of ${review.customerName}`}
                        />
                        <div className="ml-4">
                          <h2 className="text-lg font-semibold ">
                            {review.customerName}
                          </h2>
                          <p className="text-sm ">{review.customerEmail}</p>
                        </div>
                      </div>
                      <ReviewText review={review.review} wordLimit={40} />
                    </div>
                  </div>
                ))}
            </div>

            {/* Left Arrow Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 ml-2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
            >
              <FaArrowLeft></FaArrowLeft>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 mr-2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
            >
              <FaArrowRight />
            </button>
          </div>
          {/* Review Form */}

          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-slate-900 p-6 rounded text-green-500"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Share Your Experience with Us
            </h2>

            <div className="mb-4">
              <label htmlFor="customerId" className="block font-semibold mb-2">
                Customer ID
              </label>
              <input
                type="text"
                id="customerId"
                value={customerId}
                placeholder="Enter your customerId"
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="review" className="block font-semibold mb-2">
                Review
              </label>
              <textarea
                id="review"
                value={reviewText}
                placeholder="Enter your valuable opinion"
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <p className="text-green-500">{seccess}</p>
            <button
              type="submit"
              className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
