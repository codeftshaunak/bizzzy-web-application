import React from 'react'

const AllJobCardSkeleton = () => {
    return (
        <div className='w-full my-4'>
            <div class="rounded-md p-4 w-full mx-auto">
                <div class="animate-pulse">
                    <div class="rounded-full bg-slate-500 h-5 w-full"></div>
                    <div class="flex-1 space-y-4 py-1 w-full">
                        <div class="h-3 bg-slate-500 rounded"></div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-3 bg-slate-500 rounded col-span-2"></div>
                            <div class="h-3 bg-slate-500 rounded col-span-1"></div>
                            <div class="h-3 bg-slate-500 rounded col-span-2"></div>
                            <div class="h-3 bg-slate-500 rounded col-span-1"></div>
                        </div>
                        <div class="h-3 bg-slate-500 rounded"></div>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default AllJobCardSkeleton
