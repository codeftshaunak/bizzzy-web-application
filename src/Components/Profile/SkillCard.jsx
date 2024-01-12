const SkillCard = ({ title }) => {
  return (
    <div className="flex items-center gap-[8px] p-[12px] border-[1px] border-[#D1D5DB] rounded-lg">
      <div className="flex items-center justify-center w-[42px]  h-[42px] rounded-[10px] bg-[#F0FDF4]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.0154 4.19434H17.5525C19.0022 4.19432 20.1708 4.1943 21.0898 4.31787C22.0441 4.44615 22.8475 4.72061 23.4855 5.35869C24.1237 5.99679 24.3982 6.8002 24.5264 7.7544C24.6499 8.67348 24.6499 9.84204 24.6499 11.2918V12.448C24.6499 13.4067 24.6499 14.1797 24.5934 14.8034C24.5351 15.4462 24.4118 16.0078 24.1173 16.518C23.7685 17.1223 23.2666 17.6242 22.6623 17.973C22.152 18.2675 21.5904 18.3908 20.9477 18.4491C20.324 18.5056 19.5509 18.5056 18.5923 18.5056H16.998C17.3137 17.9599 17.4943 17.3263 17.4943 16.6505C17.4943 14.6013 15.8331 12.9401 13.784 12.9401C11.7348 12.9401 10.0736 14.6013 10.0736 16.6505C10.0736 17.3263 10.2543 17.9599 10.57 18.5056H8.9756C8.01701 18.5056 7.24389 18.5056 6.62025 18.4491C5.97746 18.3908 5.41582 18.2675 4.90565 17.973C4.30132 17.6242 3.79947 17.1223 3.45056 16.518C3.15601 16.0078 3.03274 15.4462 2.97447 14.8034C2.91795 14.1797 2.91796 13.4067 2.91797 12.4481V11.2918C2.91795 9.84206 2.91793 8.67347 3.04149 7.7544C3.16978 6.8002 3.44423 5.99679 4.08233 5.35869C4.72041 4.72061 5.52383 4.44615 6.47804 4.31787C7.39709 4.1943 8.56569 4.19432 10.0154 4.19434ZM8.48347 6.84458C8.04436 6.84458 7.6884 7.20055 7.6884 7.63965C7.6884 8.07876 8.04436 8.43472 8.48347 8.43472H19.0844C19.5235 8.43472 19.8795 8.07876 19.8795 7.63965C19.8795 7.20055 19.5235 6.84458 19.0844 6.84458H8.48347ZM9.80859 10.8199C9.80859 10.3808 10.1646 10.0249 10.6037 10.0249H16.9642C17.4033 10.0249 17.7593 10.3808 17.7593 10.8199C17.7593 11.2591 17.4033 11.615 16.9642 11.615H10.6037C10.1646 11.615 9.80859 11.2591 9.80859 10.8199Z"
            fill="#16A34A"
          />
          <path
            d="M11.8678 19.8281L11.477 22.3688C11.3285 23.3346 11.2541 23.8176 11.5336 24.0054C11.8131 24.1932 12.2322 23.9417 13.0702 23.4389L13.2384 23.338C13.5042 23.1786 13.637 23.0988 13.7839 23.0988C13.9307 23.0988 14.0635 23.1786 14.3293 23.338L14.4975 23.4389C15.3355 23.9417 15.7546 24.1932 16.034 24.0054C16.3136 23.8176 16.2392 23.3346 16.0907 22.3688L15.6999 19.8281C15.1406 20.1661 14.4849 20.3605 13.7839 20.3605C13.0828 20.3605 12.4271 20.1661 11.8678 19.8281Z"
            fill="#16A34A"
          />
          <path
            d="M13.7843 14.5303C12.6133 14.5303 11.6641 15.4795 11.6641 16.6505C11.6641 17.8214 12.6133 18.7707 13.7843 18.7707C14.9552 18.7707 15.9044 17.8214 15.9044 16.6505C15.9044 15.4795 14.9552 14.5303 13.7843 14.5303Z"
            fill="#16A34A"
          />
        </svg>
      </div>
      <p className="text-[16px] text-[#374151]] font-[600] capitalize">
        {title}
      </p>
    </div>
  );
};

export default SkillCard;
