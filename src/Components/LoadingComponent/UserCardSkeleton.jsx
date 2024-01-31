import React from 'react'

const UserCardSkeleton = () => {
    return (
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-3 py-1 justify-center">
                    <div class="rounded-full bg-slate-700 h-12 w-12 m-auto"></div>
                    <div class="h-3 bg-slate-700 rounded"></div>
                    <div class="h-2 bg-slate-700 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-3 bg-slate-700 rounded col-span-2"></div>
                            <div class="h-3 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div class="h-8 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCardSkeleton
