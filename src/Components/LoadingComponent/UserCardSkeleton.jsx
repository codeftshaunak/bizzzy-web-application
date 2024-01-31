import React from 'react'

const UserCardSkeleton = () => {
    return (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-3 py-1 justify-center">
                    <div className="rounded-full bg-slate-700 h-12 w-12 m-auto"></div>
                    <div className="h-3 bg-slate-700 rounded"></div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-3 bg-slate-700 rounded col-span-2"></div>
                            <div className="h-3 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-8 bg-slate-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCardSkeleton
